RealTimeValidator = function() {
	
}

RealTimeValidator.prototype.type = 'RealTimeValidator';

RealTimeValidator.prototype.isValid = function(command) {
	// Rule 2: There must be only one connection per input port
	if(command instanceof draw2d.CommandConnect && command.target.getConnections().getSize() > 1) {
		return false;
	}
	return true;
}
