/**
 * Crea una compuerta lógica NOT
 * @class Representa una compuerta lógica NOT
 * @augments Component
 * @param {String} id Identificador único de este objeto. Si no se especifica ninguno, el identificador
 * es generado aleatoriamente.
 */
NotGate = function(id){
  Component.call(this,id);
  
  this.setDimension(67, 34);
  this.setImage(rootUrl+'/images/NOT.png');
}

NotGate.prototype = new Component;
NotGate.prototype.constructor = NotGate;
NotGate.prototype.type = 'NotGate';

NotGate.prototype.setDesignArea = function(designArea){
  this.createInputPort(designArea, 0, 17);
  this.createOutputPort(designArea, 67, 17);
}
