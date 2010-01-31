Display = function (workflow) {
	Component.call(this);
	
	this.setImage("/images/display.gif");
  this.setDimension(69, 95);
}

Display.prototype = new Component;
Display.prototype.constructor = Display;
Display.prototype.type = 'Display';