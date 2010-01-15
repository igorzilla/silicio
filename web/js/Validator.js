Validator = function(components) {
	this.components = components;
	this.errorMessage = null;
	
	this.isValid = function() {
		//Verify that all ports of all components are connected
    for (var i = 0; i < components.getSize(); i++) {
			if(!components.get(i).arePortsConnected()) {
				this.errorMessage = 'Todos los componentes deben estar conectados';
				return false;
			}
    }
		return true;
	}
	
	this.getErrorMessage = function() {
		return this.errorMessage;
	}
}
