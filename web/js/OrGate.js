OrGate = function(workflow){
    TwoInputBasicGate.call(this,workflow);
    this.setImage("/images/OR.gif");
		this.setDimension(67, 35);
}

OrGate.prototype = new TwoInputBasicGate;
OrGate.prototype.constructor = OrGate;
OrGate.prototype.type = 'OrGate';
