
Serializer = function(figures){
    this.figures = figures;
    
    this.serializeInXML = function(){
        var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml = xml + '<design>\n';
        for (var i = 0; i < this.figures.getSize(); i++) {
            var figure = this.figures.get(i);
            //            xml = xml + '<' + figure.type + ' id="' + figure.getId() + '"></' + figure.type + '>\n';
            //            outputConnections = figure.getOutputConnections();
            //            for (j = 0; j < outputConnections.getSize(); j++) {
            //                outputConnection = outputConnections.get(j);
            //                xml = xml + '<OutputConnection sourceId="' + outputConnection.getSource().getName() + '" targetId="' + outputConnection.getTarget().getName() + '></OutputConnection>\n';
            //            }
						
						xml = xml + figure.toXML();
        }
        xml = xml + '</design>\n';
        return xml;
    }
}
