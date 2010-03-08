/**
 * Crea una compuerta lógica OR
 * @class Representa una compuerta lógica OR
 * @augments TwoInputBasicGate
 * @param {String} id Identificador único de este objeto. Si no se especifica ninguno, el identificador
 * es generado aleatoriamente.
 */
OrGate = function(id){
    TwoInputBasicGate.call(this,id);
    this.setImage("/images/OR.png");
		this.setDimension(67, 35);
}

OrGate.prototype = new TwoInputBasicGate;
OrGate.prototype.constructor = OrGate;
OrGate.prototype.type = 'OrGate';
