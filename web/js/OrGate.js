/**
 * Crea una compuerta lógica OR
 * @class Representa una compuerta lógica OR
 * @augments TwoInputBasicGate
 * @param {Object} workflow Área de diseño donde será adicionada la compuerta
 */
OrGate = function(workflow){
    TwoInputBasicGate.call(this,workflow);
    this.setImage("/images/OR.png");
		this.setDimension(67, 35);
}

OrGate.prototype = new TwoInputBasicGate;
OrGate.prototype.constructor = OrGate;
OrGate.prototype.type = 'OrGate';
