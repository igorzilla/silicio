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

/**
 * Ordena la simulación de este componente
 */
OrGate.prototype.run = function(){
  var receivedSignal1 = this.inputPorts[0].getReceivedSignal();
  var receivedSignal2 = this.inputPorts[1].getReceivedSignal();
  if (receivedSignal1 == Component.ONE) {
    this.outputPorts[0].transmit(Component.ONE);
  }
  else 
    if (receivedSignal2 == Component.ONE) {
      this.outputPorts[0].transmit(Component.ONE);
    }
    else 
      if (receivedSignal1 == Component.ZERO && receivedSignal2 == Component.ZERO) {
        this.outputPorts[0].transmit(Component.ZERO);
      }
}
