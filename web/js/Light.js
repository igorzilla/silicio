/**
 * Crea una lámpara
 * @class Representa una lámpara cuyo estado de encendido depende de la señal de entrada
 * @augments Component
 * @param {DesignArea} designArea Área de diseño donde será adicionada la lámpara
 */
Light = function () {
  Component.call(this);
	
  this.setImage("/images/light_off.png");
  this.setDimension(48, 61);
}

Light.prototype = new Component;
Light.prototype.constructor = Light;
Light.prototype.type = 'Light';

Light.prototype.setDesignArea = function (designArea) {
	this.createInputPort(designArea, 24, 58);
}