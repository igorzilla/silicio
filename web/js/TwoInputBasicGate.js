/**
 * Crea una compuerta lógica de dos entradas
 * @class Representa una compuerta lógica de dos entradas. Es la super clase de todas las compuertas
 * lógicas cuyo funcionamiento depende de dos entradas.
 * @augments Component
 * @param {DesignArea} designArea Área de diseño donde será adicionada la compuerta
 */
TwoInputBasicGate = function(designArea){
  Component.call(this);
  
  this.createInputPort(designArea, 0, 9);
  this.createInputPort(designArea, 0, 25);
	
	this.createOutputPort(designArea, 67, 17);
}

TwoInputBasicGate.prototype = new Component;
TwoInputBasicGate.prototype.constructor = TwoInputBasicGate;
TwoInputBasicGate.prototype.type = 'TwoInputBasicGate';
