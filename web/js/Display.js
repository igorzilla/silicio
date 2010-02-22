/**
 * Crea una pantalla numérica
 * @class Representa una pantalla que puede desplegar números enteros en el rango [0-9]
 * @augments Component
 * @param {DesignArea} designArea Área de diseño donde será adicionada la pantalla
 */
Display = function (designArea) {
	Component.call(this);
	
  this.setBackgroundColor(new draw2d.Color(0,0,0));
  this.setDimension(63, 95);
}

Display.prototype = new Component;
Display.prototype.constructor = Display;
Display.prototype.type = 'Display';