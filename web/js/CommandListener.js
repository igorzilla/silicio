/**
 * Crea un sensor de comandos
 * @class Sensor que percibe todos los comandos ejecutados sobre un área de diseño. También se encarga
 * de deshacer aquellos que invaliden el diseño.
 * @param {DesignTab} designTab Pestaña que contiene el área de diseño desde la cual se percibirán los comandos
 * @augments draw2d.CommandStackEventListener
 */
CommandListener = function(designTab){
  draw2d.CommandStackEventListener.call(this);
  
  /**
   * Pestaña de diseño desde cuya área de diseño se percibirán los comandos
   * @private
   */
  this.designTab = designTab;
  
  /**
   * Área de diseño desde la cual se percibirán los comandos
   * @private
   */
  this.designArea = this.designTab.getDesignArea();
  
  this.designArea.getCommandStack().addCommandStackEventListener(this);
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
    var errorCode = this.designArea.validate(command);
    if (errorCode != DesignArea.NO_ERROR) {
      command.undo();
      MainController.generateValidationError(errorCode);
    }
  }
}
