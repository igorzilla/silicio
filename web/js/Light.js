/**
 * Crea una lámpara
 * @class Representa una lámpara cuyo estado de encendido depende de la señal de entrada
 * @augments Component
 * @param {String} id Identificador único de este objeto. Si no se especifica ninguno, el identificador
 * es generado aleatoriamente.
 */
Light = function(id){
  Component.call(this, id);
  
  this.setImage(rootUrl + '/images/light_off.png');
  this.setDimension(48, 61);
}

Light.prototype = new Component;
Light.prototype.constructor = Light;
Light.prototype.type = 'Light';

/**
 * Asigna un área de diseño a este componente para que sea graficado dentro de ella
 * @param {DesignArea} designArea Área de diseño donde será graficado el componente
 */
Light.prototype.setDesignArea = function(designArea){
  this.createInputPort(designArea, 24, 58);
}

/**
 * Enciende la lámpara
 */
Light.prototype.turnOn = function(){
  this.setImage(rootUrl + '/images/light_on.png');
}

/**
 * Apaga la lámpara
 */
Light.prototype.turnOff = function(){
  this.setImage(rootUrl + '/images/light_off.png');
}

/**
 * Ordena la simulación de este componente
 */
Light.prototype.run = function(){
  var receivedSignal = this.inputPorts[0].getReceivedSignal();
  if (receivedSignal == Component.ONE) {
    this.turnOn();
  }
  else {
    this.turnOff();
  }
}

/**
 * Borra el estado de los puertos y apaga la lámpara
 */
Light.prototype.reset = function(){
  Component.prototype.reset.call(this);
  this.turnOff();
}
