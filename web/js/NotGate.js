/**
 * Crea una compuerta lógica NOT
 * @class Representa una compuerta lógica NOT
 * @augments Component
 * @param {String} id Identificador único de este objeto. Si no se especifica ninguno, el identificador
 * es generado aleatoriamente.
 */
NotGate = function(id){
  Component.call(this, id);
  
  this.setDimension(67, 34);
  this.setImage(rootUrl + '/images/NOT.png');
}

NotGate.prototype = new Component;
NotGate.prototype.constructor = NotGate;
NotGate.prototype.type = 'NotGate';

/**
 * Asigna un área de diseño a este componente para que sea graficado dentro de ella
 * @param {DesignArea} designArea Área de diseño donde será graficado el componente
 */
NotGate.prototype.setDesignArea = function(designArea){
  this.createInputPort(designArea, 0, 17);
  this.createOutputPort(designArea, 67, 17);
}

/**
 * Ordena la simulación de este componente
 */
NotGate.prototype.run = function(){
  var receivedSignal = this.inputPorts[0].getReceivedSignal();
  if (receivedSignal == Component.ZERO) {
    this.outputPorts[0].transmit(Component.ONE);
  }
  else 
    if (receivedSignal == Component.ONE) {
      this.outputPorts[0].transmit(Component.ZERO);
    }
}
