TwoInputBasicGate = function(workflow){
	Component.call(this);

  this.inputPorts[0] = new draw2d.InputPort();
  this.inputPorts[0].setWorkflow(workflow);
  this.inputPorts[0].setBackgroundColor(new draw2d.Color(255, 128, 128));
  this.inputPorts[0].setName(this.getId());
  this.addPort(this.inputPorts[0], 0, 9);
  
  this.inputPorts[1] = new draw2d.InputPort();
  this.inputPorts[1].setWorkflow(workflow);
  this.inputPorts[1].setBackgroundColor(new draw2d.Color(255, 128, 128));
  this.inputPorts[1].setName(this.getId());
  this.addPort(this.inputPorts[1], 0, 25);
  
  this.outputPorts[0] = new draw2d.OutputPort();
  this.outputPorts[0].setWorkflow(workflow);
  this.outputPorts[0].setName(this.getId());
  this.addPort(this.outputPorts[0], 67, 17);
}

TwoInputBasicGate.prototype = new draw2d.ImageFigure;
TwoInputBasicGate.prototype.constructor = TwoInputBasicGate;
TwoInputBasicGate.prototype.type = 'TwoInputBasicGate';
