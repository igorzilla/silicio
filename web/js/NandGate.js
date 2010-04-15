/**
 * Crea una compuerta lógica NAND
 * @class Representa una compuerta lógica NAND
 * @augments TwoInputBasicGate
 * @param {String} id Identificador único de este objeto. Si no se especifica ninguno, el identificador
 * es generado aleatoriamente.
 */
NandGate = function(id){
  TwoInputBasicGate.call(this, id);
  this.setImage(rootUrl + '/images/NAND.png');
  this.setDimension(74, 35);
}

NandGate.prototype = new TwoInputBasicGate;
NandGate.prototype.constructor = NandGate;
NandGate.prototype.type = 'NandGate';

NandGate.prototype.run = function(){
  var receivedSignal1 = this.inputPorts[0].getReceivedSignal();
  var receivedSignal2 = this.inputPorts[1].getReceivedSignal();
  var outputSignal = receivedSignal1 * receivedSignal2;
  if (outputSignal <= Component.ONE) {
    this.outputPorts[0].transmit(Component.ONE - outputSignal);
  }
}

NandGate.prototype.setDesignArea = function(designArea){
	this.createInputPort(designArea, 0, 9);
  this.createInputPort(designArea, 0, 25);
  
  this.createOutputPort(designArea, 74, 17);
}
