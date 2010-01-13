NotGate = function(workflow){
    draw2d.ImageFigure.call(this);
    
    this.setDimension(67, 34);
    this.setImage("/images/NOT.gif");
    
    this.inputPort = new draw2d.InputPort();
    this.inputPort.setWorkflow(workflow);
    this.inputPort.setBackgroundColor(new draw2d.Color(255, 128, 128));
    this.inputPort.setName(this.getId());
    this.addPort(this.inputPort, 0, 17);
    
    this.outputPort = new draw2d.OutputPort();
    this.outputPort.setWorkflow(workflow);
    this.outputPort.setName(this.getId());
    this.addPort(this.outputPort, 67, 17);
    
    this.toXML = function(){
        var xml = '<component>\n';
        xml = xml + '<class>NotGate</class>';
        xml = xml + '<id>' + this.getId() + '</id>';
        xml = xml + '<xCoordinate>' + this.getAbsoluteX() + '</xCoordinate>';
        xml = xml + '<yCoordinate>' + this.getAbsoluteY() + '</yCoordinate>';
        xml = xml + '</component>\n';
        
        var outputConnections = this.outputPort.getConnections();
        for (var i = 0; i < outputConnections.getSize(); i++) {
            outputConnection = outputConnections.get(i);
            xml = xml + '<component>';
            xml = xml + '<class>Connection</class>';
            xml = xml + '<sourceId>' + outputConnection.getSource().getName() + '</sourceId>';
            xml = xml + '<targetId>' + outputConnection.getTarget().getName() + '</targetId>';
            xml = xml + '</component>\n';
        }
        
        return xml;
    }
}

NotGate.prototype = new draw2d.ImageFigure;
NotGate.prototype.constructor = NotGate;
NotGate.prototype.type = 'NotGate';
