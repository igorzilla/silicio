AndGate = function(workflow){
	TwoInputBasicGate.call(this,workflow);
	this.setImage("/images/AND.gif");
	this.setDimension(67, 35);
}

AndGate.prototype = new draw2d.ImageFigure;
AndGate.prototype.constructor = AndGate;
AndGate.prototype.type = 'AndGate';
