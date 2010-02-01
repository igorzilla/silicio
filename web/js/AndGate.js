AndGate = function(workflow){
	TwoInputBasicGate.call(this,workflow);
	this.setImage("/images/AND.png");
	this.setDimension(67, 35);
}

AndGate.prototype = new TwoInputBasicGate;
AndGate.prototype.constructor = AndGate;
AndGate.prototype.type = 'AndGate';
