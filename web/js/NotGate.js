NotGate = function(workflow){
  Component.call(this);
  
  this.setDimension(67, 34);
  this.setImage("/images/NOT.png");
  
  this.inputPorts[0] = new draw2d.InputPort();
  this.inputPorts[0].setWorkflow(workflow);
  this.inputPorts[0].setBackgroundColor(new draw2d.Color(255, 255, 255));
  this.inputPorts[0].setName(this.getId());
  this.addPort(this.inputPorts[0], 0, 17);
  
  this.outputPorts[0] = new draw2d.OutputPort();
  this.outputPorts[0].setWorkflow(workflow);
	this.outputPorts[0].setBackgroundColor(new draw2d.Color(255, 255, 255));
  this.outputPorts[0].setName(this.getId());
  this.addPort(this.outputPorts[0], 67, 17);
}

NotGate.prototype = new Component;
NotGate.prototype.constructor = NotGate;
NotGate.prototype.type = 'NotGate';
