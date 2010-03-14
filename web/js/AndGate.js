/**
 * Crea una compuerta lógica AND
 * @class Representa una compuerta lógica AND
 * @augments TwoInputBasicGate
 * @param {String} id Identificador único de este objeto. Si no se especifica ninguno, el identificador
 * es generado aleatoriamente.
 */
AndGate = function(id){
	TwoInputBasicGate.call(this,id);
	this.setImage(rootUrl+'/images/AND.png');
	this.setDimension(67, 35);
}

AndGate.prototype = new TwoInputBasicGate;
AndGate.prototype.constructor = AndGate;
AndGate.prototype.type = 'AndGate';
