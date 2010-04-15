/**
 * @class
 * @augments Component
 * @param {String} id Identificador único de este objeto. Si no se especifica ninguno, el identificador
 * es generado aleatoriamente.
 */
Chip7483 = function(id){
  Component.call(this, id);
  
  this.setImage(rootUrl + '/images/chip7483.png');
  this.setDimension(104, 59);
}

Chip7483.prototype = new Component;
Chip7483.prototype.constructor = Chip7483;
Chip7483.prototype.type = 'Chip7483';

Chip7483.prototype.setDesignArea = function(designArea){
  this.createInputPort(designArea, 84, 1);
  this.createInputPort(designArea, 97, 59);
  this.createInputPort(designArea, 32, 59);
  this.createInputPort(designArea, 6, 59);
  this.createInputPort(designArea, 71, 1);
  this.createInputPort(designArea, 84, 59);
  this.createInputPort(designArea, 45, 59);
  this.createInputPort(designArea, 6, 1);
  this.createInputPort(designArea, 45, 1);
  this.createInputPort(designArea, 58, 59);
  
  this.createOutputPort(designArea, 97, 1);
  this.createOutputPort(designArea, 71, 59);
  this.createOutputPort(designArea, 19, 59);
  this.createOutputPort(designArea, 19, 1);
  this.createOutputPort(designArea, 32, 1);
  this.createOutputPort(designArea, 58, 1);
}

Chip7483.prototype.run = function(){
  var operando1 = new Array();
  operando1.push(this.inputPorts[0].getReceivedSignal());
  operando1.push(this.inputPorts[1].getReceivedSignal());
  operando1.push(this.inputPorts[2].getReceivedSignal());
  operando1.push(this.inputPorts[3].getReceivedSignal());
  
  var operando2 = new Array();
  operando2.push(this.inputPorts[4].getReceivedSignal());
  operando2.push(this.inputPorts[5].getReceivedSignal());
  operando2.push(this.inputPorts[6].getReceivedSignal());
  operando2.push(this.inputPorts[7].getReceivedSignal());
  
  var carry = this.inputPorts[8].getReceivedSignal();
  
  if (carry != Component.UNDETERMINED) {
    for (var i = 0; i < 4; i++) {
      if (operando1[i] == Component.UNDETERMINED || operando2[i] == Component.UNDETERMINED) {
        return;
      }
      else {
        if (operando1[i] == operando2[i]) {
          this.outputPorts[i].transmit(carry);
          carry = operando1[i];
        }
        else {
          this.outputPorts[i].transmit(Component.negate(carry));
        }
      }
    }
    
    this.outputPorts[4].transmit(carry);
  }
}
