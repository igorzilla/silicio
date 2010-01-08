AndGate = function(workflow) {
	draw2d.ImageFigure.call(this);
	this.setColor(null);
	this.setDimension(67,35);
	this.setResizeable(false);
	this.setImage("/images/AND.gif");
	
	this.in1 = new draw2d.InputPort();
	this.in1.setWorkflow(workflow);
	this.in1.setBackgroundColor(new draw2d.Color(255,128,128));
	this.addPort(this.in1,0,9);
	
	this.in2 = new draw2d.InputPort();
	this.in2.setWorkflow(workflow);
	this.in2.setBackgroundColor(new draw2d.Color(255,128,128));
	this.addPort(this.in2,0,25);
	
	this.out = new draw2d.OutputPort();
	this.out.setWorkflow(workflow);
	this.addPort(this.out,67,17);
}

AndGate.prototype = new draw2d.ImageFigure;
AndGate.prototype.constructor = AndGate;