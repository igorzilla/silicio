TwoInputBasicGate = function(workflow){
    draw2d.ImageFigure.call(this);
    
    this.setDimension(67, 35);
    
    this.inputPort1 = new draw2d.InputPort();
    this.inputPort1.setWorkflow(workflow);
    this.inputPort1.setBackgroundColor(new draw2d.Color(255, 128, 128));
    this.inputPort1.setName(this.getId());
    this.addPort(this.inputPort1, 0, 9);
    
    this.inputPort2 = new draw2d.InputPort();
    this.inputPort2.setWorkflow(workflow);
    this.inputPort2.setBackgroundColor(new draw2d.Color(255, 128, 128));
    this.inputPort2.setName(this.getId());
    this.addPort(this.inputPort2, 0, 25);
    
    this.outputPort = new draw2d.OutputPort();
    this.outputPort.setWorkflow(workflow);
    this.outputPort.setName(this.getId());
    this.addPort(this.outputPort, 67, 17);
    
    this.toXML = function(){
        var xml = '<component>\n';
        xml = xml + '<class>AndGate</class>';
        xml = xml + '<id>'+this.getId()+'</id>';
        xml = xml + '<xCoordinate>'+this.getAbsoluteX()+'</xCoordinate>';
        xml = xml + '<yCoordinate>'+this.getAbsoluteY()+'</yCoordinate>';
        xml = xml + '</component>\n';
        
        var outputConnections = this.outputPort.getConnections();
        for(var i=0;i<outputConnections.getSize();i++) {
          outputConnection = outputConnections.get(i);
          xml = xml + '<component>';
          xml = xml + '<class>Connection</class>';
          xml = xml + '<sourceId>'+outputConnection.getSource().getName()+'</sourceId>';
          xml = xml + '<targetId>'+outputConnection.getTarget().getName()+'</targetId>';
          xml = xml + '</component>\n';
        }
        
        return xml;
    }
}

AndGate.prototype = new draw2d.ImageFigure;
AndGate.prototype.constructor = TwoInputBasicGate;
AndGate.prototype.type = 'TwoInputBasicGate';
