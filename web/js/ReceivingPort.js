ReceivingPort = function (index) {
	draw2d.InputPort.call(this);
	
	this.index = index;
	
	this.receivedSignal = Component.UNDETERMINED;
}

ReceivingPort.prototype = new draw2d.InputPort;
ReceivingPort.prototype.constructor = ReceivingPort;
ReceivingPort.prototype.type = 'ReceivingPort';

ReceivingPort.prototype.getIndex = function() {
	return this.index;
}

ReceivingPort.prototype.getReceivedSignal = function() {
	return this.receivedSignal;
}

ReceivingPort.prototype.receive = function(signal) {
	this.receivedSignal = signal;
	var parent = this.getParent();
	parent.run();
}
