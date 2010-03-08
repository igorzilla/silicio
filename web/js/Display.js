/**
 * Crea una pantalla numérica
 * @class Representa una pantalla que puede desplegar números enteros en el rango [0-9]
 * @augments Component
 * @param {String} id Identificador único de este objeto. Si no se especifica ninguno, el identificador
 * es generado aleatoriamente.
 */
Display = function(id){
  Component.call(this,id);
  
  this.setImage("/images/display-bg.png");
  this.setDimension(63, 121);
  
  /**
   * Segmentos de la pantalla que se iluminan
   * @type Array
   * @private
   */
  this.segments = new Array();
  
  this.segments[0] = document.createElement('img');
  this.segments[0].src = '/images/a-segment.png';
  this.segments[0].style.position = 'absolute';
  this.segments[0].style.top = '17px';
  this.segments[0].style.left = '4px';
  this.segments[0].style.visibility = 'hidden';
  this.html.appendChild(this.segments[0]);
  
  this.segments[1] = document.createElement('img');
  this.segments[1].src = '/images/b-segment.png';
  this.segments[1].style.position = 'absolute';
  this.segments[1].style.top = '19px';
  this.segments[1].style.left = '40px';
  this.segments[1].style.visibility = 'hidden';
  this.html.appendChild(this.segments[1]);
  
  this.segments[2] = document.createElement('img');
  this.segments[2].src = '/images/c-segment.png';
  this.segments[2].style.position = 'absolute';
  this.segments[2].style.top = '61px';
  this.segments[2].style.left = '40px';
  this.segments[2].style.visibility = 'hidden';
  this.html.appendChild(this.segments[2]);
  
  this.segments[3] = document.createElement('img');
  this.segments[3].src = '/images/d-segment.png';
  this.segments[3].style.position = 'absolute';
  this.segments[3].style.top = '96px';
  this.segments[3].style.left = '4px';
  this.segments[3].style.visibility = 'hidden';
  this.html.appendChild(this.segments[3]);
  
  this.segments[4] = document.createElement('img');
  this.segments[4].src = '/images/e-segment.png';
  this.segments[4].style.position = 'absolute';
  this.segments[4].style.top = '61px';
  this.segments[4].style.left = '2px';
  this.segments[4].style.visibility = 'hidden';
  this.html.appendChild(this.segments[4]);
  
  this.segments[5] = document.createElement('img');
  this.segments[5].src = '/images/f-segment.png';
  this.segments[5].style.position = 'absolute';
  this.segments[5].style.top = '19px';
  this.segments[5].style.left = '2px';
  this.segments[5].style.visibility = 'hidden';
  this.html.appendChild(this.segments[5]);
  
  this.segments[6] = document.createElement('img');
  this.segments[6].src = '/images/g-segment.png';
  this.segments[6].style.position = 'absolute';
  this.segments[6].style.top = '56px';
  this.segments[6].style.left = '6px';
  this.segments[6].style.visibility = 'hidden';
  this.html.appendChild(this.segments[6]);
  
  this.segments[7] = document.createElement('img');
  this.segments[7].src = '/images/decimal-point.png';
  this.segments[7].style.position = 'absolute';
  this.segments[7].style.top = '95px';
  this.segments[7].style.left = '52px';
  this.segments[7].style.visibility = 'hidden';
  this.html.appendChild(this.segments[7]);
}

Display.prototype = new Component;
Display.prototype.constructor = Display;
Display.prototype.type = 'Display';

Display.prototype.setDesignArea = function(designArea){
  this.createInputPort(designArea, 13, 0);
  this.createInputPort(designArea, 25, 0);
  this.createInputPort(designArea, 38, 0);
  this.createInputPort(designArea, 50, 0);
  this.createInputPort(designArea, 13, 121);
  this.createInputPort(designArea, 25, 121);
  this.createInputPort(designArea, 38, 121);
  this.createInputPort(designArea, 50, 121);
}
