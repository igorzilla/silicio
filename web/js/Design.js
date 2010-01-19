Design = function(components){
  this.components = components;
  this.errorMessage = null;
}

Design.prototype.isValid = function(){
  //Rule 1: All ports of all components must be connected   
  for (var i = 0; i < this.components.getSize(); i++) {
    if (!this.components.get(i).arePortsConnected()) {
      this.errorMessage = 'Todos los componentes deben estar conectados';
      return false;
    }
  }
  //Rule 2: There must be only one connection per input port (validated in real time through RealTimeValidator)
  return true;
}

Design.prototype.getErrorMessage = function(){
  return this.errorMessage;
}

Design.prototype.toXML = function(){
  if (!this.isValid()) {
    return null;
  }
  var xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml = xml + '<design>';
  var componentsXml = '<components>';
  var connectionsXml = '<connections>';
  for (var i = 0; i < this.components.getSize(); i++) {
    var figure = this.components.get(i);
    componentsXml = componentsXml + figure.toXML();
    connectionsXml = connectionsXml + figure.outputConnectionsToXML();
  }
  componentsXml = componentsXml + '<components>';
  connectionsXml = connectionsXml + '<connections>';
  xml = xml + componentsXml + connectionsXml;
  xml = xml + '</design>';
  return xml;
}
