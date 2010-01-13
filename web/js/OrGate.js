OrGate = function(workflow){
    TwoInputBasicGate.call(this,workflow);
    this.setImage("/images/OR.gif");
}

OrGate.prototype = new draw2d.ImageFigure;
OrGate.prototype.constructor = OrGate;
OrGate.prototype.type = 'OrGate';
