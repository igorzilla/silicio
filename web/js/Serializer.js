
Serializer = function(figures){
    this.figures = figures;
    
    this.serializeInXML = function(){
        var xml = '<?xml version="1.0" encoding="UTF-8"?>';
        xml = xml + '<design>';
				var componentsXml = '<components>';
				var connectionsXml = '<connections>';
        for (var i = 0; i < this.figures.getSize(); i++) {
            var figure = this.figures.get(i);
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
