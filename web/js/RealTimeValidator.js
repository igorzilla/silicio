/**
 * Crea un validador en tiempo real
 * @class Validador de diseños en tiempo real
 */
RealTimeValidator = function() {
	
}

RealTimeValidator.prototype.type = 'RealTimeValidator';

/**
 * Verifica si un diseño cumple las reglas de validación
 * en tiempo real
 * @param {draw2d.Command} command Comando ejecutado por el usuario
 */
RealTimeValidator.prototype.isValid = function(command) {
	// Rule 2: There must be only one connection per input port
	if(command instanceof draw2d.CommandConnect && command.target.getConnections().getSize() > 1) {
		return false;
	}
	return true;
}
