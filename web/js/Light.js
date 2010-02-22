/**
 * Crea una lámpara
 * @class Representa una lámpara cuyo estado de encendido depende de la señal de entrada
 * @augments Component
 * @param {DesignArea} designArea Área de diseño donde será adicionada la lámpara
 */
Light = function (designArea) {
  Component.call(this);
  
	this.inputPorts[0] = new draw2d.InputPort();
  this.inputPorts[0].setWorkflow(designArea);
  this.inputPorts[0].setBackgroundColor(new draw2d.Color(255, 255, 255));
  this.inputPorts[0].setName(this.getId());
  this.addPort(this.inputPorts[0], 24, 47);
	
  this.setImage("/images/light_off.png");
  this.setDimension(48, 48);
}

Light.prototype = new Component;
Light.prototype.constructor = Light;
Light.prototype.type = 'Light';