/**
 * Crea una compuerta lógica XOR
 * @class Representa una compuerta lógica XOR
 * @augments TwoInputBasicGate
 * @param {String} id Identificador único de este objeto. Si no se especifica ninguno, el identificador
 * es generado aleatoriamente.
 */
XorGate = function(id){
  TwoInputBasicGate.call(this, id);
  this.setImage(rootUrl + '/images/XOR.png');
  this.setDimension(67, 35);
}

XorGate.prototype = new TwoInputBasicGate;
XorGate.prototype.constructor = XorGate;
XorGate.prototype.type = 'XorGate';

/**
 * Ordena la simulación de este componente
 */
XorGate.prototype.run = function(){
  var receivedSignal1 = this.inputPorts[0].getReceivedSignal();
  var receivedSignal2 = this.inputPorts[1].getReceivedSignal();
  var sum = receivedSignal1 + receivedSignal2;
  if (sum <= Component.ONE) {
    this.outputPorts[0].transmit(sum);
  }
  else 
    if (receivedSignal1 == Component.ONE && receivedSignal2 == Component.ONE) {
      this.outputPorts[0].transmit(Component.ZERO);
    }
}
