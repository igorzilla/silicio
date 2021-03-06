/**
 * Crea un interruptor
 * @class Representa un interruptor de voltaje cuyo estado puede cambiar, interactivamente,
 * haciendo doble click sobre él
 * @augments Component
 * @param {String} id Identificador único de este objeto. Si no se especifica ninguno, el identificador
 * es generado aleatoriamente.
 */
Switch = function(id){
  Component.call(this, id);
  
  this.setImage(rootUrl + '/images/switch-off.png');
  this.setDimension(72, 58);
  
	/**
	 * Indica si el interruptor está encendido
	 * @private
	 */
  this.isOn = false;
}

Switch.prototype = new Component;
Switch.prototype.constructor = Switch;
Switch.prototype.type = 'Switch';

/**
 * Asigna un área de diseño a este componente para que sea graficado dentro de ella
 * @param {DesignArea} designArea Área de diseño donde será graficado el componente
 */
Switch.prototype.setDesignArea = function(designArea){
  this.createOutputPort(designArea, 72, 30);
}

/**
 * Invierte el estado del interruptor
 */
Switch.prototype.toggle = function(){
  if (this.isOn) {
    this.setImage(rootUrl + '/images/switch-off.png');
  }
  else {
    this.setImage(rootUrl + '/images/switch-on.png');
  }
  this.isOn = !this.isOn;
  this.run();
}

/**
 * Invocado cada vez que el usuario hace doble click sobre el interruptor
 * @private
 */
Switch.prototype.onDoubleClick = function(){
  this.toggle();
}

/**
 * Ordena la simulación de este componente
 */
Switch.prototype.run = function(){
  if (this.isOn) {
    this.outputPorts[0].transmit(Component.ONE);
  }
  else {
    this.outputPorts[0].transmit(Component.ZERO);
  }
  var designArea = this.getDesignArea();
  designArea.processQueue();
}
