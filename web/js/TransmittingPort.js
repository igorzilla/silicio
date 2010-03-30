TransmittingPort = function () {
	draw2d.OutputPort.call(this);
}

TransmittingPort.prototype = new draw2d.OutputPort;
TransmittingPort.prototype.constructor = TransmittingPort;
TransmittingPort.prototype.type = 'TransmittingPort';

TransmittingPort.prototype.transmit = function(signal) {
	var connections = this.getConnections();
	for(var i=0;i<connections.getSize();i++) {
		var connection = connections.get(i);
		var receivingPort = connection.getTarget();
		receivingPort.receive(signal);
	}
}
