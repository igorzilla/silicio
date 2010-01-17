CommandListener = function(){
  draw2d.CommandStackEventListener.call(this);
}

CommandListener.prototype = new draw2d.CommandStackEventListener();
CommandListener.prototype.constructor = CommandListener;
CommandListener.prototype.type = 'CommandListener';

CommandListener.prototype.stackChanged = function(event){
  var command = event.getCommand();
  //TODO: The following logic application should be encapsulated in class 'Design'
  //	Rule 2: Must be only one connection per input port
  if (event.isPostChangeEvent() && command instanceof draw2d.CommandConnect && command.target.getConnections().getSize() > 1) {
    command.undo();
    Ext.Msg.alert('Error', 'Por puede haber más de una conexión por cada puerto de entrada');
  }
}
