IndexedInputPort = function (parentComponent, index) {
	draw2d.InputPort.call(this);
	
	this.parentComponent = parentComponent;
	
	this.index = index;
}

IndexedInputPort.prototype = new draw2d.InputPort;
IndexedInputPort.prototype.constructor = IndexedInputPort;
IndexedInputPort.prototype.type = 'IndexedInputPort';

IndexedInputPort.prototype.getIndex = function() {
	return this.index;
}
