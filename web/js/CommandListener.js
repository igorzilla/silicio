/**
 * Crea un escuchador de comandos
 * @class Responsable de escuchar los comandos realizados por el usuario e informar
 * al validador de diseños en tiempo real
 * @augments draw2d.CommandStackEventListener
 */
CommandListener = function(){
  draw2d.CommandStackEventListener.call(this);
  this.realTimeValidator = new RealTimeValidator();
}

CommandListener.prototype = new draw2d.CommandStackEventListener();
CommandListener.prototype.constructor = CommandListener;
CommandListener.prototype.type = 'CommandListener';

/**
 * Invocado cada vez que se genera un evento en la pila de comandos
 * @param {draw2d.CommandStackEvent} event Evento de la pila de comandos
 * @private
 */
CommandListener.prototype.stackChanged = function(event){
  if (event.isPostChangeEvent()) {
    var command = event.getCommand();
    if (!this.realTimeValidator.isValid(command)) {
      command.undo();
			MainController.generateError('Solo una conexión por cada puerto de entrada');
    }
  }
}
