/**
 * Crea una compuerta lógica OR
 * @class Representa una compuerta lógica OR
 * @augments TwoInputBasicGate
 * @param {String} id Identificador único de este objeto. Si no se especifica ninguno, el identificador
 * es generado aleatoriamente.
 */
OrGate = function(id){
  TwoInputBasicGate.call(this, id);
  this.setImage(rootUrl + '/images/OR.png');
  this.setDimension(67, 35);
}

OrGate.prototype = new TwoInputBasicGate;
OrGate.prototype.constructor = OrGate;
OrGate.prototype.type = 'OrGate';

OrGate.prototype.run = function(){
  var receivedSignal1 = this.inputPorts[0].getReceivedSignal();
  var receivedSignal2 = this.inputPorts[1].getReceivedSignal();
  var outputSignal = receivedSignal1 + receivedSignal2;
  if (outputSignal <= Component.ONE) {
    this.outputPorts[0].transmit(outputSignal);
  }
  else 
    if (receivedSignal1 == receivedSignal2) {
      this.outputPorts[0].transmit(Component.ONE);
    }
}
