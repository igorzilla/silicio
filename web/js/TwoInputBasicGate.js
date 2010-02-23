/**
 * Crea una compuerta lógica de dos entradas
 * @class Representa una compuerta lógica de dos entradas. Es la super clase de todas las compuertas
 * lógicas cuyo funcionamiento depende de dos entradas.
 * @augments Component
 * @param {DesignArea} designArea Área de diseño donde será adicionada la compuerta
 */
TwoInputBasicGate = function(designArea){
	Component.call(this);

  this.inputPorts[0] = new draw2d.InputPort();
  this.inputPorts[0].setWorkflow(designArea);
  this.inputPorts[0].setBackgroundColor(new draw2d.Color(255, 255, 255));
  this.inputPorts[0].setName(this.getId());
  this.addPort(this.inputPorts[0], 0, 9);
  
  this.inputPorts[1] = new draw2d.InputPort();
  this.inputPorts[1].setWorkflow(designArea);
  this.inputPorts[1].setBackgroundColor(new draw2d.Color(255, 255, 255));
  this.inputPorts[1].setName(this.getId());
  this.addPort(this.inputPorts[1], 0, 25);
  
  this.outputPorts[0] = new draw2d.OutputPort();
  this.outputPorts[0].setWorkflow(designArea);
  this.outputPorts[0].setBackgroundColor(new draw2d.Color(255, 255, 255));
  this.outputPorts[0].setName(this.getId());
  this.addPort(this.outputPorts[0], 67, 17);
	
}

TwoInputBasicGate.prototype = new Component;
TwoInputBasicGate.prototype.constructor = TwoInputBasicGate;
TwoInputBasicGate.prototype.type = 'TwoInputBasicGate';
