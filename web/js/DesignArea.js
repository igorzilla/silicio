/**
 * Crea una área de diseño
 * @class Área de diseño de circuitos donde es posible insertar gráficamente los componentes
 * @param {String} id Identificador del elemento &lt;div&gt; que se usará como área de diseño
 * @param {Boolean} isNew Especifica si el diseño es nuevo
 */
DesignArea = function(id){
  draw2d.Workflow.call(this, id);
  
  this.setBackgroundImage(rootUrl + '/images/grid.png', true);
  
  var designArea = this;
  
  this.scrollArea = this.html.parentNode;
  
  new Ext.dd.DropTarget(id, {
    notifyDrop: function(source, event, data){
      if (designArea.getMode() == DesignArea.EDIT_MODE) {
        var xCoordinate = event.xy[0] - designArea.getAbsoluteX() + designArea.getScrollLeft();
        var yCoordinate = event.xy[1] - designArea.getAbsoluteY() + designArea.getScrollTop();
        MainController.loadRemoteClass(data.className, function(){
          var component = eval('new ' + data.className + '()');
          designArea.addFigure(component, xCoordinate, yCoordinate);
          Ext.Msg.hide();
        });
        return true;
      }
    }
  });
  
	/**
	 * Cola de simulación de esta área de diseño
	 * @private
	 */
  this.simulationQueue = new SimulationQueue();
  
  /**
   * Indica el modo de trabajo en el cual se encuentra el área de diseño
   * @private
   */
  this.mode = DesignArea.EDIT_MODE;
}

DesignArea.prototype = new draw2d.Workflow;
DesignArea.prototype.constructor = DesignArea;
DesignArea.prototype.type = 'DesignArea';

DesignArea.maximumDesignAreaId = 0;

/**
 * Genera un identificador único para un área de diseño
 * @returns {String} Identificador único
 */
DesignArea.generateNewDesignAreaId = function(){
  var newDesignAreaId = DesignArea.maximumDesignAreaId;
  DesignArea.maximumDesignAreaId = DesignArea.maximumDesignAreaId + 1;
  return 'design_area_' + newDesignAreaId;
}

//TODO: Is required any form of validation?
///**
// * Verifica si el diseño presente en esta área de diseño es sintácticamente válido
// * @returns {Boolean} Devuelve TRUE solo si el diseño es sintácticamente válido
// */
//DesignArea.prototype.isValid = function(){
//  var components = this.getDocument().getFigures();
//  
//  //Rule 1: All ports of all components must be connected   
//  for (var i = 0; i < components.getSize(); i++) {
//    if (!this.components.get(i).arePortsConnected()) {
//      this.errorMessage = 'Todos los componentes deben estar conectados';
//      return false;
//    }
//  }
//  //Rule 2: There must be only one connection per input port (validated in real time through RealTimeValidator)
//  return true;
//}
///**
// * Devuelve el mensaje de error por el cual este diseño no es considerado válido.
// * El uso de este método siempre debe ser posterior a una invocación al método isValid()
// * @returns {String} Mensaje de error
// */
//DesignArea.prototype.getErrorMessage = function(){
//  return this.errorMessage;
//}

/**
 * Serializa el diseño actual utilizando lenguaje XML, pero  el código XML generado
 * está dividido en la parte de los componentes y la parte de las conexiones.
 * @returns {Object} Objeto literal que contiene las dos partes del código XML del diseño. Las
 * propiedades de este objeto son: componentsXml y connectionsXml.
 */
DesignArea.prototype.toSplittedXML = function(){
  var components = this.getDocument().getFigures();
  var componentsXml = '<components>';
  var connectionsXml = '<connections>';
  for (var i = 0; i < components.getSize(); i++) {
    var component = components.get(i);
    componentsXml = componentsXml + component.toXML();
    connectionsXml = connectionsXml + component.outputConnectionsToXML();
  }
  componentsXml = componentsXml + '</components>';
  connectionsXml = connectionsXml + '</connections>';
  var xmlContainer = {
    componentsXml: componentsXml,
    connectionsXml: connectionsXml
  };
  return xmlContainer;
}

/**
 * Serializa el diseño actual utilizando lenguaje XML
 * @returns {String} Serialización XML del diseño actual
 */
DesignArea.prototype.toXML = function(){
  var components = this.getDocument().getFigures();
  var xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml = xml + '<design ';
  xml = xml + 'xmlns="http://www.w3schools.com" ';
  xml = xml + 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ';
  xml = xml + 'xsi:schemaLocation="http://www.w3schools.com design.xsd"';
  xml = xml + '>';
  var xmlContainer = this.toSplittedXML();
  var componentsXml = xmlContainer.componentsXml;
  var connectionsXml = xmlContainer.connectionsXml;
  xml = xml + componentsXml + connectionsXml;
  xml = xml + '</design>';
  return xml;
}

/**
 * No hubo error en la validación
 * @static
 */
DesignArea.NO_ERROR = 0;

/**
 * Solo puede haber una conexión por cada puerto de entrada
 * @static
 */
DesignArea.SEVERAL_CONNECTIONS_ON_INPUT_PORT = 1;

/**
 * No se permite en modo de simulación
 * @static
 */
DesignArea.NO_ALLOWED_IN_SIMULATION_MODE = 2;

/**
 * El área de diseño está en modo de edición(modo por defecto)
 * @static
 */
DesignArea.EDIT_MODE = 0;

/**
 * El área de diseñor está en modo de simulación
 * @static
 */
DesignArea.SIMULATION_MODE = 1;

/**
 * Verifica si un comando invalida un diseño
 * @param {draw2d.Command} command Comando ejecutado sobre el área de diseño
 * @returns {Integer} Código del error que invalida el diseño
 */
DesignArea.prototype.validate = function(command){
  // Rule 1: All commands must be undone in simulation mode
  if (this.mode == DesignArea.SIMULATION_MODE) {
    return DesignArea.NO_ALLOWED_IN_SIMULATION_MODE;
  }
  // Rule 2: There must be only one connection per input port
  if (command instanceof draw2d.CommandConnect && command.target.getConnections().getSize() > 1) {
    return DesignArea.SEVERAL_CONNECTIONS_ON_INPUT_PORT;
  }
  return DesignArea.NO_ERROR;
}

/**
 * Devuelve el modo en el que se encuentra el área de diseño
 * @returns {Integer} Modo en el que se encuentra el área de diseño
 */
DesignArea.prototype.getMode = function(){
  return this.mode;
}

/**
 * Coloca el área de diseño en modo de edición y borra el estado de todos
 * los componentes
 */
DesignArea.prototype.turnOnEditMode = function(){
  this.mode = DesignArea.EDIT_MODE;
  var components = this.getDocument().getFigures();
  for (var i = 0; i < components.getSize(); i++) {
    var component = components.get(i);
    component.reset();
  }
}

/**
 * Ordena el procesamiento de la cola de simulación
 */
DesignArea.prototype.processQueue = function(){
  //  var component = null;
  //  while (!this.simulationQueue.isEmpty()) {
  //    component = this.simulationQueue.dequeue();
  //    component.run();
  //  }
  this.simulationQueue.process();
}

/**
 * Adiciona todos los componentes a la cola de simulación y ordena el procesamiento
 * de la misma
 * @private
 */
DesignArea.prototype.simulate = function(){
  var components = this.getDocument().getFigures();
  for (var i = 0; i < components.getSize(); i++) {
    var component = components.get(i);
    this.simulationQueue.enqueue(component);
  }
  this.simulationQueue.process();
}

/**
 * Coloca el área de diseño en modo de simulación y ordena la ejecución de la simulación del circuito
 */
DesignArea.prototype.turnOnSimulationMode = function(){
  this.mode = DesignArea.SIMULATION_MODE;
  this.simulate();
}

/**
 * Adiciona un componente a la cola de simulación de esta área de diseño
 * @param {Component} component Componente que se desea encolar
 */
DesignArea.prototype.addToSimulationQueue = function(component){
  this.simulationQueue.enqueue(component);
}
