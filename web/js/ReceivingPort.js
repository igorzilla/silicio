ReceivingPort = function(index){
  draw2d.InputPort.call(this);
  
  this.index = index;
  
  this.receivedSignal = Component.UNDETERMINED;
  
  this.previousReceivedSignal = Component.UNDETERMINED;
}

ReceivingPort.prototype = new draw2d.InputPort;
ReceivingPort.prototype.constructor = ReceivingPort;
ReceivingPort.prototype.type = 'ReceivingPort';

ReceivingPort.prototype.getIndex = function(){
  return this.index;
}

ReceivingPort.prototype.getReceivedSignal = function(){
  return this.receivedSignal;
}

ReceivingPort.prototype.getPreviousReceivedSignal = function(){
  var previousReceivedSignal = this.previousReceivedSignal;
  this.previousReceivedSignal = Component.UNDETERMINED;
  return previousReceivedSignal;
}

ReceivingPort.prototype.receive = function(signal){
  this.previousReceivedSignal = this.receivedSignal;
  this.receivedSignal = signal;
}

ReceivingPort.prototype.reset = function(){
  this.receivedSignal = Component.UNDETERMINED;
  this.previousReceivedSignal = Component.UNDETERMINED;
}
