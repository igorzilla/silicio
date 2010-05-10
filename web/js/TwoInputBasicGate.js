/**
 * Crea una compuerta lógica de dos entradas
 * @class Representa una compuerta lógica de dos entradas. Es la super clase de todas las compuertas
 * lógicas cuyo funcionamiento depende de dos entradas.
 * @augments Component
 * @param {String} id Identificador único de este objeto. Si no se especifica ninguno, el identificador
 * es generado aleatoriamente.
 */
TwoInputBasicGate = function(id){
  Component.call(this, id);
}

TwoInputBasicGate.prototype = new Component;
TwoInputBasicGate.prototype.constructor = TwoInputBasicGate;
TwoInputBasicGate.prototype.type = 'TwoInputBasicGate';

/**
 * Asigna un área de diseño a este componente para que sea graficado dentro de ella
 * @param {DesignArea} designArea Área de diseño donde será graficado el componente
 */
TwoInputBasicGate.prototype.setDesignArea = function(designArea){
  this.createInputPort(designArea, 0, 9);
  this.createInputPort(designArea, 0, 25);
  
  this.createOutputPort(designArea, 67, 17);
}
