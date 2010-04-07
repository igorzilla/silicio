/**
 * Crea un interruptor
 * @class Representa un interruptor de voltaje cuyo estado puede cambiar, interactivamente,
 * haciendo doble click sobre él
 * @augments Component
 * @param {String} id Identificador único de este objeto. Si no se especifica ninguno, el identificador
 * es generado aleatoriamente.
 */
Clock = function(id){
  Component.call(this, id);
  
  this.setImage(rootUrl + '/images/clock_off.png');
  this.setDimension(83, 82);
  
  this.isOn = false;
  
  this.intervalId = null;
}

Clock.prototype = new Component;
Clock.prototype.constructor = Clock;
Clock.prototype.type = 'Clock';

Clock.prototype.setDesignArea = function(designArea){
  this.createOutputPort(designArea, 41, 1);
  this.createOutputPort(designArea, 41, 82);
  this.createOutputPort(designArea, 1, 41);
  this.createOutputPort(designArea, 83, 40);
}

Clock.prototype.turnOff = function(){
  this.isOn = false;
  this.setImage(rootUrl + '/images/clock_off.png');
}

Clock.prototype.turnOn = function(){
  this.isOn = true;
  this.setImage(rootUrl + '/images/clock_on.png');
}

/**
 * Invierte el estado del interruptor
 */
Clock.prototype.generatePulse = function(){
  if (this.isOn) {
    this.turnOff();
    this.outputPorts[0].transmit(Component.ZERO);
    this.outputPorts[1].transmit(Component.ZERO);
    this.outputPorts[2].transmit(Component.ZERO);
    this.outputPorts[3].transmit(Component.ZERO);
  }
  else {
    this.turnOn();
    this.outputPorts[0].transmit(Component.ONE);
    this.outputPorts[1].transmit(Component.ONE);
    this.outputPorts[2].transmit(Component.ONE);
    this.outputPorts[3].transmit(Component.ONE);
  }
  var designArea = this.getWorkflow();
  designArea.processQueue();
}

Clock.prototype.run = function(){
  var clock = this;
  this.intervalId = setInterval(function(){
    clock.generatePulse();
  }, 500);
}

Clock.prototype.stop = function(){
  clearInterval(this.intervalId);
	this.turnOff();
}

Clock.prototype.reset = function(){
  Component.prototype.reset.call(this);
  this.stop();
}
