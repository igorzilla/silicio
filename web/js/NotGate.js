NotGate = function(workflow) {
	draw2d.ImageFigure.call(this);
	this.setColor(null);
	this.setDimension(67,34);
	this.setResizeable(false);
	this.setImage("/images/NOT.gif");
	
	this.in1 = new draw2d.InputPort();
	this.in1.setWorkflow(workflow);
	this.in1.setBackgroundColor(new draw2d.Color(255,128,128));
	this.addPort(this.in1,0,17);
	
	this.out = new draw2d.OutputPort();
	this.out.setWorkflow(workflow);
	this.addPort(this.out,67,17);
}

NotGate.prototype = new draw2d.ImageFigure;
NotGate.prototype.constructor = NotGate;