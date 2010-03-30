/**
 * Crea una lámpara
 * @class Representa una lámpara cuyo estado de encendido depende de la señal de entrada
 * @augments Component
 * @param {String} id Identificador único de este objeto. Si no se especifica ninguno, el identificador
 * es generado aleatoriamente.
 */
Light = function (id) {
  Component.call(this,id);
	
  this.setImage(rootUrl+'/images/light_off.png');
  this.setDimension(48, 61);
}

Light.prototype = new Component;
Light.prototype.constructor = Light;
Light.prototype.type = 'Light';

Light.prototype.setDesignArea = function (designArea) {
	this.createInputPort(designArea, 24, 58);
}

Light.prototype.run = function() {
	var receivedSignal = this.inputPorts[0].getReceivedSignal();
	if(receivedSignal == Component.ZERO) {
		this.setImage(rootUrl+'/images/light_off.png');
	}
	else {
		this.setImage(rootUrl+'/images/light_on.png');
	}
}
