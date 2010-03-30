TransmittingPort = function () {
	draw2d.OutputPort.call(this);
}

TransmittingPort.prototype = new draw2d.OutputPort;
TransmittingPort.prototype.constructor = TransmittingPort;
TransmittingPort.prototype.type = 'TransmittingPort';
