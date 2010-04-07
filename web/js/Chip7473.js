/**
 * @class
 * @augments Component
 * @param {String} id Identificador único de este objeto. Si no se especifica ninguno, el identificador
 * es generado aleatoriamente.
 */
Chip7473 = function(id){
  Component.call(this, id);
  
  this.setImage(rootUrl + '/images/chip7473.png');
  this.setDimension(91, 59);
}

Chip7473.prototype = new Component;
Chip7473.prototype.constructor = Chip7473;
Chip7473.prototype.type = 'Chip7473';

Chip7473.prototype.setDesignArea = function(designArea){
  this.createInputPort(designArea, 6, 59);
  this.createInputPort(designArea, 19, 59);
  this.createInputPort(designArea, 32, 59);
  this.createInputPort(designArea, 45, 59);
  this.createInputPort(designArea, 58, 59);
  this.createInputPort(designArea, 71, 59);
  this.createInputPort(designArea, 84, 59);
  this.createInputPort(designArea, 6, 1);
  this.createInputPort(designArea, 58, 1);
  
  this.createOutputPort(designArea, 19, 1);
  this.createOutputPort(designArea, 32, 1);
  this.createOutputPort(designArea, 45, 1);
  this.createOutputPort(designArea, 71, 1);
  this.createOutputPort(designArea, 84, 1);
}

Chip7473.prototype.run = function(){
  var clear1 = this.inputPorts[1].getReceivedSignal();
  if (clear1 == Component.ZERO) {
    this.outputPorts[0].transmit(Component.ONE);
    this.outputPorts[1].transmit(Component.ZERO);
  }
  else 
    if (clear1 == Component.ONE) {
      var clock1 = this.inputPorts[0].getReceivedSignal();
      var previousClock1 = this.inputPorts[0].getPreviousReceivedSignal();
      if (previousClock1 == Component.ONE && clock1 == Component.ZERO) {
        var j1 = this.inputPorts[7].getReceivedSignal();
        var k1 = this.inputPorts[2].getReceivedSignal();
        var sum1 = j1 + k1;
        if (sum1 == Component.ONE) {
          this.outputPorts[1].transmit(j1);
          this.outputPorts[0].transmit(Component.negate(j1));
        }
        else 
          if (j1 == Component.ONE && k1 == Component.ONE) {
            var q1 = this.outputPorts[1].getTransmitedSignal();
            this.outputPorts[1].transmit(this.outputPorts[0].getTransmitedSignal());
            this.outputPorts[0].transmit(q1);
          }
      }
    }
  
  var clear2 = this.inputPorts[5].getReceivedSignal();
  if (clear2 == Component.ZERO) {
    this.outputPorts[3].transmit(Component.ZERO);
    this.outputPorts[4].transmit(Component.ONE);
  }
  else 
    if (clear2 == Component.ONE) {
      var clock2 = this.inputPorts[4].getReceivedSignal();
      var previousClock2 = this.inputPorts[4].getPreviousReceivedSignal();
      if (previousClock2 == Component.ONE && clock2 == Component.ZERO) {
        var j2 = this.inputPorts[6].getReceivedSignal();
        var k2 = this.inputPorts[8].getReceivedSignal();
        var sum2 = j2 + k2;
        if (sum2 == Component.ONE) {
          this.outputPorts[3].transmit(j2);
          this.outputPorts[4].transmit(Component.negate(j2));
        }
        else 
          if (j2 == Component.ONE && k2 == Component.ONE) {
            var q2 = this.outputPorts[3].getTransmitedSignal();
            this.outputPorts[3].transmit(this.outputPorts[4].getTransmitedSignal());
            this.outputPorts[4].transmit(q2);
          }
      }
    }
}
