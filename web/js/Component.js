Component = function(){
  draw2d.ImageFigure.call(this);
  
  this.inputPorts = new Array();
  this.outputPorts = new Array();
}

Component.prototype = new draw2d.ImageFigure;
Component.prototype.constructor = Component;
Component.prototype.type = 'Component';

Component.prototype.getIndexOfInputPort = function(inputPortId){
  for (var i = 0; i < this.inputPorts.length; i++) {
    if (this.inputPorts[i].getId() == inputPortId) {
      return i;
    }
  }
  return -1;
}

Component.prototype.toXML = function(){
  var xml = '<component>';
  xml = xml + '<class>' + this.type + '</class>';
  xml = xml + '<id>' + this.getId() + '</id>';
  xml = xml + '<xCoordinate>' + this.getAbsoluteX() + '</xCoordinate>';
  xml = xml + '<yCoordinate>' + this.getAbsoluteY() + '</yCoordinate>';
  xml = xml + '</component>';
  
  return xml;
}

Component.prototype.outputConnectionsToXML = function(){
  var xml = '';
  for (var j = 0; j < this.outputPorts.length; j++) {
    var outputConnections = this.outputPorts[j].getConnections();
    for (var i = 0; i < outputConnections.getSize(); i++) {
      var outputConnection = outputConnections.get(i);
      var target = outputConnection.getTarget().getParent();
      var inputPortId = outputConnection.getTarget().getId();
      xml = xml + '<connection>';
      xml = xml + '<sourceId>' + this.getId() + '</sourceId>';
      xml = xml + '<sourcePortIndex>' + j + '</sourcePortIndex>';
      xml = xml + '<targetId>' + target.getId() + '</targetId>';
      xml = xml + '<targetPortIndex>' + target.getIndexOfInputPort(inputPortId) + '</targetPortIndex>';
      xml = xml + '</connection>';
    }
  }
  return xml;
}

Component.prototype.arePortsConnected = function(){
  for (var i = 0; i < this.inputPorts.length; i++) {
    if (this.inputPorts[i].getConnections().getSize() == 0) {
      return false;
    }
  }
  for (var i = 0; i < this.outputPorts.length; i++) {
    if (this.outputPorts[i].getConnections().getSize() == 0) {
      return false;
    }
  }
  return true;
}
