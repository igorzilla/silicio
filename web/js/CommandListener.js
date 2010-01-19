CommandListener = function(){
  draw2d.CommandStackEventListener.call(this);
  this.realTimeValidator = new RealTimeValidator();
}

CommandListener.prototype = new draw2d.CommandStackEventListener();
CommandListener.prototype.constructor = CommandListener;
CommandListener.prototype.type = 'CommandListener';

CommandListener.prototype.stackChanged = function(event){
  if (event.isPostChangeEvent()) {
    var command = event.getCommand();
    if (!this.realTimeValidator.isValid(command)) {
      command.undo();
			mainController.generateError('Solo una conexión por cada puerto de entrada');
    }
  }
}
