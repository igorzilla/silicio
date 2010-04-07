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
  
  this.setImage(rootUrl + '/images/clock.png');
  this.setDimension(59, 60);
  
  this.isOn = false;
}

Clock.prototype = new Component;
Clock.prototype.constructor = Clock;
Clock.prototype.type = 'Clock';

Clock.prototype.setDesignArea = function(designArea){
  //  this.createOutputPort(designArea, 72, 30);
}

/**
 * Invierte el estado del interruptor
 */
Clock.prototype.toggle = function(){
  if (this.isOn) {
    this.setImage(rootUrl + '/images/clock.png');
  }
  else {
    this.setImage(rootUrl + '/images/clock.png');
  }
  this.isOn = !this.isOn;
  this.run();
}

Clock.prototype.run = function(){
  if (this.isOn) {
  
  }
  else {
  
  }
}
