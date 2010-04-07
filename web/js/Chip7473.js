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
    //  var J1 = this.inputPorts[].getReceivedSignal();
    //  var K1 = this.inputPorts[].getReceivedSignal(); 
    }
  
  var clear2 = this.inputPorts[5].getReceivedSignal();
  if (clear2 == Component.ZERO) {
    this.outputPorts[3].transmit(Component.ZERO);
    this.outputPorts[4].transmit(Component.ONE);
  }
}
