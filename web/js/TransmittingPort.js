TransmittingPort = function(){
  draw2d.OutputPort.call(this);
  
  this.transmitedSignal = Component.UNDETERMINED;
}

TransmittingPort.prototype = new draw2d.OutputPort;
TransmittingPort.prototype.constructor = TransmittingPort;
TransmittingPort.prototype.type = 'TransmittingPort';

TransmittingPort.prototype.transmit = function(signal){
  if (signal != this.transmitedSignal) {
    this.transmitedSignal = signal;
    var connections = this.getConnections();
    for (var i = 0; i < connections.getSize(); i++) {
      var connection = connections.get(i);
      if (signal == Component.ZERO) {
        connection.setColor(new draw2d.Color(0, 0, 0));
      }
      else {
        connection.setColor(new draw2d.Color(255, 0, 0));
      }
      var receivingPort = connection.getTarget();
      receivingPort.receive(signal);
    }
  }
}

TransmittingPort.prototype.getTransmitedSignal = function(){
  return this.transmitedSignal;
}

TransmittingPort.prototype.reset = function(){
  this.transmitedSignal = Component.UNDETERMINED;
  var connections = this.getConnections();
  for (var i = 0; i < connections.getSize(); i++) {
    var connection = connections.get(i);
    connection.setColor(new draw2d.Color(0, 0, 0));
  }
}
