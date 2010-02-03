Display = function (workflow) {
	Component.call(this);
	
  this.setBackgroundColor(new draw2d.Color(0,0,0));
  this.setDimension(63, 95);
}

Display.prototype = new Component;
Display.prototype.constructor = Display;
Display.prototype.type = 'Display';