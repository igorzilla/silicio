/**
 * Crea una compuerta lógica NOR
 * @class Representa una compuerta lógica NOR
 * @augments TwoInputBasicGate
 * @param {String} id Identificador único de este objeto. Si no se especifica ninguno, el identificador
 * es generado aleatoriamente.
 */
NorGate = function(id){
  TwoInputBasicGate.call(this, id);
  this.setImage(rootUrl + '/images/NOR.png');
  this.setDimension(73, 35);
}

NorGate.prototype = new TwoInputBasicGate;
NorGate.prototype.constructor = NorGate;
NorGate.prototype.type = 'NorGate';

/**
 * Ordena la simulación de este componente
 */
NorGate.prototype.run = function(){
  var receivedSignal1 = this.inputPorts[0].getReceivedSignal();
  var receivedSignal2 = this.inputPorts[1].getReceivedSignal();
  if (receivedSignal1 == Component.ONE) {
    this.outputPorts[0].transmit(Component.ZERO);
  }
  else 
    if (receivedSignal2 == Component.ONE) {
      this.outputPorts[0].transmit(Component.ZERO);
    }
    else 
      if (receivedSignal1 == Component.ZERO && receivedSignal2 == Component.ZERO) {
        this.outputPorts[0].transmit(Component.ONE);
      }
}

/**
 * Asigna un área de diseño a este componente para que sea graficado dentro de ella
 * @param {DesignArea} designArea Área de diseño donde será graficado el componente
 */
NorGate.prototype.setDesignArea = function(designArea){
  this.createInputPort(designArea, 0, 9);
  this.createInputPort(designArea, 0, 25);
  
  this.createOutputPort(designArea, 73, 17);
}
