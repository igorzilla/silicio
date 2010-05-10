/**
 * Crea un puerto de recepción de señales
 * @class Representa un puerto que permite recibir señales digitales de otros puertos.
 * Puede conectarse gráficamente a un puerto de transmisión.
 * @param {Integer} index Posición del puerto en el componente que lo contiene
 */
ReceivingPort = function(index){
  draw2d.InputPort.call(this);
  
	/**
	 * Posición del puerto en el componente que lo contiene
	 * @private
	 */
  this.index = index;
  
	/**
	 * Última señal recibida
	 * @private
	 */
  this.receivedSignal = Component.UNDETERMINED;
  
	/**
   * Señal anterior a la última señal recibida
   * @private
   */
  this.previousReceivedSignal = Component.UNDETERMINED;
}

ReceivingPort.prototype = new draw2d.InputPort;
ReceivingPort.prototype.constructor = ReceivingPort;
ReceivingPort.prototype.type = 'ReceivingPort';

/**
 * Devuelve la posición del puerto en el componente que lo contiene
 * @returns {Integer} Posición del puerto
 */
ReceivingPort.prototype.getIndex = function(){
  return this.index;
}

/**
 * Devuelve la última señal recibida
 * @returns {Integer} Última señal recibida
 */
ReceivingPort.prototype.getReceivedSignal = function(){
  return this.receivedSignal;
}

/**
 * Devuelve la señal anterior a la última señal recibida
 * @returns {Integer} Señal anterior a la última señal recibida
 */
ReceivingPort.prototype.getPreviousReceivedSignal = function(){
  var previousReceivedSignal = this.previousReceivedSignal;
  this.previousReceivedSignal = Component.UNDETERMINED;
  return previousReceivedSignal;
}

/**
 * Recibe una señal digital
 * @param {Integer} signal Señal digital que debe ser recibida 
 */
ReceivingPort.prototype.receive = function(signal){
  this.previousReceivedSignal = this.receivedSignal;
  this.receivedSignal = signal;
}

/**
 * Borra el estado de las señales recibidas
 */
ReceivingPort.prototype.reset = function(){
  this.receivedSignal = Component.UNDETERMINED;
  this.previousReceivedSignal = Component.UNDETERMINED;
}
