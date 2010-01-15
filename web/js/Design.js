Design = function(components){
  this.components = components;
  this.errorMessage = null;
  
  this.isValid = function(){
    //Rule 1: All ports of all components must be connected   
    for (var i = 0; i < components.getSize(); i++) {
      if (!components.get(i).arePortsConnected()) {
        this.errorMessage = 'Todos los componentes deben estar conectados';
        return false;
      }
    }
    return true;
  }
  
  this.getErrorMessage = function(){
    return this.errorMessage;
  }
  
  this.toXML = function(){
		if(!this.isValid()) {
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
}
