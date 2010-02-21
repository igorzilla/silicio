/**
 * Crea un interruptor
 * @class Representa un interruptor de voltaje cuyo estado puede cambiar, interactivamente,
 * haciendo doble click sobre él
 * @augments Component
 * @param {DesignArea} workflow Área de diseño donde será adicionado el interruptor
 */
Switch = function (workflow) {
  Component.call(this);
  
  this.outputPorts[0] = new draw2d.OutputPort();
  this.outputPorts[0].setWorkflow(workflow);
  this.outputPorts[0].setBackgroundColor(new draw2d.Color(255, 255, 255));
  this.outputPorts[0].setName(this.getId());
  this.addPort(this.outputPorts[0], 72, 30);
  
  this.setImage("/images/switch-off.png");
	this.isOn = false;
  this.setDimension(72, 58);
}

Switch.prototype = new Component;
Switch.prototype.constructor = Switch;
Switch.prototype.type = 'Switch';

/**
 * Invocado cada vez que el usuario hace doble click sobre el interruptor
 * @private
 */
Switch.prototype.onDoubleClick = function () {
	if(this.isOn) {
		this.isOn = false;
		this.setImage("/images/switch-off.png");
	}
	else {
		this.isOn = true;
		this.setImage("/images/switch-on.png");
	}
}