/**
 * Crea un componente de un circuito
 * @class Representa un componente de un circuito. Es la super clase de todos los componentes
 * disponibles para el diseño de circuitos.
 * @augments draw2d.ImageFigure
 */
Component = function(){
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
			//TODO: Avoid search of index of target port, setting the index equal to the identifier(using associative arrays)
      xml = xml + '<targetPortIndex>' + target.getIndexOfInputPort(inputPortId) + '</targetPortIndex>';
      xml = xml + '</connection>';
    }
  }
  return xml;
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
