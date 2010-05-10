/**
 * Crea un generador de pulsos(reloj) de 1 Hz
 * @class Representa un componente electrónico que genera un pulso periódicamente. Cada segundo genera
 * un pulso positivo(UNO) y en el intervalo de tiempo entre dos pulsos positivos, genera un pulso
 * negativo(CERO).
 * @augments Component
 * @param {String} id Identificador único de este objeto. Si no se especifica ninguno, el identificador
 * es generado aleatoriamente.
 */
Clock = function(id){
  Component.call(this, id);
  
  this.setImage(rootUrl + '/images/clock_off.png');
  this.setDimension(83, 82);
  
  /**
   * Indica si el interruptor está encendido
   * @private
   */
  this.isOn = false;
  
  /**
   * Identificador del hilo concurrente que genera los pulsos
   * @private
   */
  this.intervalId = null;
}

Clock.prototype = new Component;
Clock.prototype.constructor = Clock;
Clock.prototype.type = 'Clock';

/**
 * Asigna un área de diseño a este componente para que sea graficado dentro de ella
 * @param {DesignArea} designArea Área de diseño donde será graficado el componente
 */
Clock.prototype.setDesignArea = function(designArea){
  this.createOutputPort(designArea, 41, 1);
  this.createOutputPort(designArea, 41, 82);
  this.createOutputPort(designArea, 1, 41);
  this.createOutputPort(designArea, 83, 40);
}

/**
 * Apaga el estado del reloj
 */
Clock.prototype.turnOff = function(){
  this.isOn = false;
  this.setImage(rootUrl + '/images/clock_off.png');
}

/**
 * Enciende el estado del reloj
 */
Clock.prototype.turnOn = function(){
  this.isOn = true;
  this.setImage(rootUrl + '/images/clock_on.png');
}

/**
 * Genera una señal digital de acuerdo a su estado
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
  var designArea = this.getDesignArea();
  designArea.processQueue();
}

/**
 * Ordena la simulación de este componente
 */
Clock.prototype.run = function(){
  var clock = this;
  this.intervalId = setInterval(function(){
    clock.generatePulse();
  }, 500);
}

/**
 * Detiene la generación del pulsos del reloj
 */
Clock.prototype.stop = function(){
  clearInterval(this.intervalId);
  this.turnOff();
}

/**
 * Borra el estado del reloj y detiene la generación del pulsos
 */
Clock.prototype.reset = function(){
  Component.prototype.reset.call(this);
  this.stop();
}
