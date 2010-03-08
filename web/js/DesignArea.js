/**
 * Crea una área de diseño
 * @class Área de diseño de circuitos donde es posible insertar gráficamente los componentes
 * @param {String} id Identificador del elemento &lt;div&gt; que se usará como área de diseño
 * @param {Boolean} isNew Especifica si el diseño es nuevo
 */
DesignArea = function(id, isNew){
  draw2d.Workflow.call(this, id);
  
  this.setBackgroundImage(rootUrl+'/images/grid.png', true);
  this.getCommandStack().addCommandStackEventListener(new RealTimeValidator());
  
  if (!isNew) {
    /**
     * Indica si el diseño es nuevo, es decir, que no se ha guardado por primera vez
     * @type Boolean
     * @private
     */
    this.isNew = true;
    /**
     * Indica si el diseño no ha sufrido cambios desde la última vez que se guardó
     * @type Boolean
     * @private
     */
    this.isSaved = false;
  }
  else {
    this.isSaved = true;
  }
  
  //  /**
  //   * Mensaje de error de validación
  //   * @type String
  //   * @private
  //   */
  //  this.errorMessage = null;
  
  var designArea = this;
  
  new Ext.dd.DropTarget(id, {
    notifyDrop: function(source, event, data){
      var xCoordinate = event.xy[0] - designArea.getAbsoluteX();
      var yCoordinate = event.xy[1] - designArea.getAbsoluteY();
      //TODO: Variable 'figure' should be called 'component'
      var figure = eval('new ' + data.className + '()');
      designArea.addFigure(figure, xCoordinate, yCoordinate);
      return true;
    }
  });
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
