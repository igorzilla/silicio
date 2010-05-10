/**
 * Crea una cola de simulación
 * @class Representa una estructura de cola que permite insertar y recuperar componentes por medio
 * de un esquema FIFO(First in, First out). Esto asegura que el primer componente que llega sea
 * el primero en ser simulado.
 */
SimulationQueue = function(){
	/**
	 * Cabeza de la cola
	 * @private
	 */
  this.head = null;
	/**
	 * Último elemento de la cola
	 * @private
	 */
  this.tail = null;
}

/**
 * Inserta un componente dentro de la cola
 * @param {Component} component Componente que será insertado en la cola de simulación
 */
SimulationQueue.prototype.enqueue = function(component){
  if (this.head == null) {
    var container = {
      component: component,
      next: null
    };
    this.head = container;
    this.tail = container;
  }
  else {
    var oldTail = this.tail;
    this.tail = {
      component: component,
      next: null
    };
    oldTail.next = this.tail
  }
}

/**
 * Recupera un componente de la cola
 * @returns {Component} componente Componente que ingresó más temprano a la cola(se elimina de la cola)
 * @private
 */
SimulationQueue.prototype.dequeue = function(){
  var oldHead = this.head;
  this.head = oldHead.next;
  return oldHead.component;
}

/**
 * Determina si la cola no contiene más elementos
 * @returns {Boolean} TRUE solo si la cola está vacía
 */
SimulationQueue.prototype.isEmpty = function(){
  return (this.head == null);
}

/**
 * Procesa la cola para llevar a cabo la simulación de los componentes que se encuentren en ella.
 * El orden de simulación es el mismo que el de la cola.
 */
SimulationQueue.prototype.process = function(){
  var component = null;
  while (!this.isEmpty()) {
    component = this.dequeue();
    component.run();
  }
}
