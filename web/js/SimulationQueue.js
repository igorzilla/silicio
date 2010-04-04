SimulationQueue = function(){
  this.head = null;
  this.tail = null;
}

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

SimulationQueue.prototype.dequeue = function(){
  var oldHead = this.head;
  this.head = oldHead.next;
  return oldHead.component;
}

SimulationQueue.prototype.isEmpty = function(){
  return (this.head == null);
}
