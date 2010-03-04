/**
 * Crea una compuerta lógica NOT
 * @class Representa una compuerta lógica NOT
 * @augments Component
 * @param {DesignArea} designArea Área de diseño donde será adicionada la compuerta
 */
NotGate = function(designArea){
  Component.call(this);
  
  this.setDimension(67, 34);
  this.setImage("/images/NOT.png");
  
	this.createInputPort(designArea, 0, 17);
	
	this.createOutputPort(designArea, 67, 17);
}

NotGate.prototype = new Component;
NotGate.prototype.constructor = NotGate;
NotGate.prototype.type = 'NotGate';
