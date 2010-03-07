/**
 * Crea un interruptor
 * @class Representa un interruptor de voltaje cuyo estado puede cambiar, interactivamente,
 * haciendo doble click sobre él
 * @augments Component
 * @param {DesignArea} designArea Área de diseño donde será adicionado el interruptor
 */
Switch = function(){
  Component.call(this);
  
  this.setImage("/images/switch-off.png");
  this.setDimension(72, 58);
	
	/**
	 * Indica si el interruptor está encendido
	 * @type Boolean
	 * @private
	 */
	this.isOn = false;
}

Switch.prototype = new Component;
Switch.prototype.constructor = Switch;
Switch.prototype.type = 'Switch';

Switch.prototype.setDesignArea = function(designArea){
	this.createOutputPort(designArea, 72, 30);
}

/**
 * Invierte el estado del interruptor
 */
Switch.prototype.toggle = function(){
  if (this.isOn) {
    this.isOn = false;
    this.setImage("/images/switch-off.png");
  }
  else {
    this.isOn = true;
    this.setImage("/images/switch-on.png");
  }
}

/**
 * Invocado cada vez que el usuario hace doble click sobre el interruptor
 * @private
 */
Switch.prototype.onDoubleClick = function(){
	this.toggle();
}
