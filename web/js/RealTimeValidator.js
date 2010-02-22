/**
 * Crea un validador en tiempo real
 * @class Validador de diseños en tiempo real
 * @augments draw2d.CommandStackEventListener
 */
RealTimeValidator = function(){
  draw2d.CommandStackEventListener.call(this);
}

RealTimeValidator.prototype = new draw2d.CommandStackEventListener();
RealTimeValidator.prototype.constructor = RealTimeValidator;
RealTimeValidator.prototype.type = 'RealTimeValidator';

/**
 * No hubo error en la validación
 * @static
 */
RealTimeValidator.NO_ERROR = 0;

/**
 * Solo puede haber una conexión por cada puerto de entrada
 * @static
 */
RealTimeValidator.SEVERAL_CONNECTIONS_ON_INPUT_PORT = 1;

/**
 * Invocado cada vez que se genera un evento en la pila de comandos
 * @param {draw2d.CommandStackEvent} event Evento de la pila de comandos
 * @private
 */
RealTimeValidator.prototype.stackChanged = function(event){
  if (event.isPostChangeEvent()) {
    var command = event.getCommand();
    var errorCode = this.validate(command);
    var errorMessage = '';
    switch (errorCode) {
      case RealTimeValidator.NO_ERROR:
        return;        break;
      case RealTimeValidator.SEVERAL_CONNECTIONS_ON_INPUT_PORT:
        errorMessage = 'Solo una conexión por cada puerto de entrada';
        break;
    }
    command.undo();
    MainController.generateError(errorMessage);
  }
}

/**
 * Verifica si un comando invalida un diseño
 * @param {draw2d.Command} command Comando ejecutado por el usuario
 * @returns {Integer} Código del error que invalida el diseño
 * @private
 */
RealTimeValidator.prototype.validate = function(command){
  // Rule 2: There must be only one connection per input port
  if (command instanceof draw2d.CommandConnect && command.target.getConnections().getSize() > 1) {
    return RealTimeValidator.SEVERAL_CONNECTIONS_ON_INPUT_PORT;
  }
  return RealTimeValidator.NO_ERROR;
}
