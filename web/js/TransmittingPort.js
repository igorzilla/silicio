/**
 * Crea un puerto de transmisión de señales
 * @class Representa un puerto que permite transmitir señales digitales a otros puertos.
 * Puede conectarse gráficamente a un puerto de recepción.
 * @augments draw2d.OutputPort
 */
TransmittingPort = function(){
  draw2d.OutputPort.call(this);
  
  /**
   * Última señal transmitida
   * @private
   */
  this.transmitedSignal = Component.UNDETERMINED;
}

TransmittingPort.prototype = new draw2d.OutputPort;
TransmittingPort.prototype.constructor = TransmittingPort;
TransmittingPort.prototype.type = 'TransmittingPort';

/**
 * Transmite una señal a todos los puertos que tengan conexión con él
 * @param {Integer} signal Señal digital que se desea transmitir
 */
TransmittingPort.prototype.transmit = function(signal){
  var designArea = this.getParent().getDesignArea();
  var mode = designArea.getMode();
  // La condición (signal != this.transmitedSignal) evita que se generen ciclos infinitos
  if (mode == DesignArea.SIMULATION_MODE && signal != this.transmitedSignal) {
    this.transmitedSignal = signal;
    var connections = this.getConnections();
    for (var i = 0; i < connections.getSize(); i++) {
      var connection = connections.get(i);
      if (signal == Component.ZERO) {
        connection.setColor(new draw2d.Color(0, 0, 0));
      }
      else {
        connection.setColor(new draw2d.Color(255, 0, 0));
      }
      var receivingPort = connection.getTarget();
      receivingPort.receive(signal);
      var parent = receivingPort.getParent();
      designArea.addToSimulationQueue(parent);
    }
  }
}

/**
 * Devuelve la última señal transmitida
 * @returns {Integer} Última señal transmitida
 */
TransmittingPort.prototype.getTransmitedSignal = function(){
  return this.transmitedSignal;
}

/**
 * Borra el estado de la señal transmitida y emite una señal de indeterminación a
 * todas las conexiones(no es recibida por los puertos)
 */
TransmittingPort.prototype.reset = function(){
  this.transmitedSignal = Component.UNDETERMINED;
  var connections = this.getConnections();
  for (var i = 0; i < connections.getSize(); i++) {
    var connection = connections.get(i);
    connection.setColor(new draw2d.Color(0, 0, 0));
  }
}
