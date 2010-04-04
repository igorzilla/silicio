/**
 * Crea un componente de un circuito
 * @class Representa un componente de un circuito. Es la super clase de todos los componentes
 * disponibles para el diseño de circuitos.
 * @augments draw2d.ImageFigure
 * @param {String} id Identificador único de este objeto. Si no se especifica ninguno, el identificador
 * es generado aleatoriamente.
 */
Component = function(id){
  if (id) {
    /**
     * Genera un identificador único
     * @private
     * @returns Identificador aleatorio de 10 caracteres
     */
    this.generateUId = function(){
      return id;
    }
  }
  draw2d.ImageFigure.call(this);
  /**
   * Puertos de entrada del componente
   * @type Array
   * @private
   */
  this.inputPorts = new Array();
  /**
   * Puertos de salida del componente
   * @type Array
   * @private
   */
  this.outputPorts = new Array();
}

Component.prototype = new draw2d.ImageFigure;
Component.prototype.constructor = Component;
Component.prototype.type = 'Component';

/**
 * Devuelve el índice del puerto de entrada con el identificador especificado
 * @param {String} inputPortId Identificador del puerto de entrada
 */
Component.prototype.getIndexOfInputPort = function(inputPortId){
  for (var i = 0; i < this.inputPorts.length; i++) {
    if (this.inputPorts[i].getId() == inputPortId) {
      return i;
    }
  }
  return -1;
}

/**
 * Serializa este componente(sin las conexiones) utilizando lenguaje XML
 * @returns {String} Serialización XML del componente
 */
Component.prototype.toXML = function(){
  var xml = '<component>';
  xml = xml + '<class>' + this.type + '</class>';
  xml = xml + '<id>' + this.getId() + '</id>';
  xml = xml + '<xCoordinate>' + this.getAbsoluteX() + '</xCoordinate>';
  xml = xml + '<yCoordinate>' + this.getAbsoluteY() + '</yCoordinate>';
  xml = xml + '</component>';
  
  return xml;
}

/**
 * Serializa todas las conexiones de salida de este componente utilizando lenguaje XML
 * @returns {String} Serialización XML de todas las conexiones de salida del componente
 */
Component.prototype.outputConnectionsToXML = function(){
  var xml = '';
  for (var j = 0; j < this.outputPorts.length; j++) {
    var outputConnections = this.outputPorts[j].getConnections();
    for (var i = 0; i < outputConnections.getSize(); i++) {
      var outputConnection = outputConnections.get(i);
      var inputPort = outputConnection.getTarget();
      var inputPortId = inputPort.getId();
      var target = inputPort.getParent();
      var targetId = target.getId();
      xml = xml + '<connection>';
      xml = xml + '<sourceId>' + this.getId() + '</sourceId>';
      xml = xml + '<sourcePortIndex>' + j + '</sourcePortIndex>';
      xml = xml + '<targetId>' + targetId + '</targetId>';
      xml = xml + '<targetPortIndex>' + inputPort.getIndex() + '</targetPortIndex>';
      xml = xml + '</connection>';
    }
  }
  return xml;
}

/**
 * Crea un puerto de entrada y lo inserta dentro de este componente
 * @param {DesignArea} designArea Área de diseño donde será insertado el puerto de entrada(debe ser la misma que la del componente)
 * @param {Integer} xCoordinate Coordenada X de la posición donde será ubicado el puerto de entrada(relativo al componente)
 * @param {Integer} yCoordinate Coordenada Y de la posición donde será ubicado el puerto de entrada(relativo al componente)
 * @private
 */
Component.prototype.createInputPort = function(designArea, xCoordinate, yCoordinate){
  var parentComponent = this;
  var portIndex = this.inputPorts.length;
  var newInputPort = new ReceivingPort(portIndex);
  newInputPort.setWorkflow(designArea);
  newInputPort.setBackgroundColor(new draw2d.Color(255, 255, 255));
  //TODO: Set the name of parent component to the port id is unnecessary, because all port have a reference to his parent
  newInputPort.setName(this.getId());
  this.inputPorts.push(newInputPort);
  this.addPort(newInputPort, xCoordinate, yCoordinate);
}

/**
 * Crea un puerto de salida y lo inserta dentro de este componente
 * @param {DesignArea} designArea Área de diseño donde será insertado el puerto de salida(debe ser la misma que la del componente)
 * @param {Integer} xCoordinate Coordenada X de la posición donde será ubicado el puerto de salida(relativo al componente)
 * @param {Integer} yCoordinate Coordenada Y de la posición donde será ubicado el puerto de salida(relativo al componente)
 * @private
 */
Component.prototype.createOutputPort = function(designArea, xCoordinate, yCoordinate){
  var newOutputPort = new TransmittingPort();
  newOutputPort.setWorkflow(designArea);
  newOutputPort.setBackgroundColor(new draw2d.Color(255, 255, 255));
  //TODO: Set the name of parent component to the port id is unnecessary, because all port have a reference to his parent
  newOutputPort.setName(this.getId());
  this.outputPorts.push(newOutputPort);
  this.addPort(newOutputPort, xCoordinate, yCoordinate);
}

/**
 * Asigna un workflow al componente
 * @private
 * @param {Workflow} workflow
 */
Component.prototype.setWorkflow = function(workflow){
  draw2d.ImageFigure.prototype.setWorkflow.call(this, workflow);
  this.setDesignArea(workflow);
}

/**
 * Asigna un área de diseño al componente(este método debería ser
 * implementado en las sub-clases para permitir la inserción de
 * puertos de entrada y salida)
 * @param {DesignArea} designArea
 */
Component.prototype.setDesignArea = function(designArea){

}

//TODO: This method might be used to avoid the simulation of the component?
///**
// * Verifica si todos los puertos de este componente están conectados
// * @returns Devuelve TRUE solo si todos los puertos del componente están conectados
// */
//Component.prototype.arePortsConnected = function(){
//  for (var i = 0; i < this.inputPorts.length; i++) {
//    if (this.inputPorts[i].getConnections().getSize() == 0) {
//      return false;
//    }
//  }
//  for (var i = 0; i < this.outputPorts.length; i++) {
//    if (this.outputPorts[i].getConnections().getSize() == 0) {
//      return false;
//    }
//  }
//  return true;
//}

/**
 * Devuelve el puerto de salida con el índice especificado
 * @param {Integer} index Índice del puerto de salida
 */
Component.prototype.getOutputPort = function(index){
  return this.outputPorts[index];
}

/**
 * Devuelve el puerto de entrada con el índice especificado
 * @param {Integer} index Índice del puerto de entrada
 */
Component.prototype.getInputPort = function(index){
  return this.inputPorts[index];
}

Component.prototype.wasRunned = function(){
  return this.runned;
}

Component.prototype.run = function(){

}

Component.prototype.reset = function(){
  var inputPort = null;
  for (var i = 0; i < this.inputPorts.length; i++) {
    inputPort = this.inputPorts[i];
    inputPort.reset();
  }
	
  var outputPort = null;
  for (var i = 0; i < this.outputPorts.length; i++) {
    outputPort = this.outputPorts[i];
    outputPort.reset();
  }
}

Component.ZERO = 0;

Component.ONE = 1;

Component.UNDETERMINED = 2;
