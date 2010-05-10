/**
 * Crea una pestaña de diseño de la aplicación
 * @class Representa una pestaña que posee un área de diseño dentro de ella
 * @param {String} Nombre del diseño que se cargará o se ha cargado en esta pestaña
 * @author Pedro Bonilla &lt;pedroabp5@gmail.com&gt;
 */
DesignTab = function(designName){
  this.designAreaId = DesignArea.generateNewDesignAreaId();
  
  /**
   * Nombre del diseño cargado dentro de la pestaña
   * @type String
   * @private
   */
  this.designName = designName;
  
  var title = '';
  
  if (this.designName) {
    /**
     * Indica si el diseño es nuevo, es decir, que no se ha guardado por primera vez
     * @type Boolean
     * @private
     */
    this.isNew = false;
    /**
     * Indica si el diseño no ha sufrido cambios desde la última vez que se guardó
     * @type Boolean
     * @private
     */
    this.isSaved = true;
    
    title = this.designName;
  }
  else {
    this.isNew = true;
    this.isSaved = false;
    this.designName = '(Sin nombre)';
    title = this.designName + '*';
  }
  
  /**
   * Panel dentro del cual se carga el área de diseño de esta pestaña
   * @type Ext.Panel
   * @private
   */
  this.panel = new Ext.Panel({
    title: title,
    iconCls: 'design_area_tab',
    closable: true,
    html: '<div id="' + this.designAreaId + '" style="position: relative; width: 3000px; height: 3000px;"></div>',
    designTab: this
  });
  
	/**
	 * Área de diseño de esta pestaña
	 * @private
	 */
	this.designArea = null;
}

/**
 * Coloca el foco en esta pestaña
 */
DesignTab.prototype.show = function(){
  this.panel.show();
  //TODO: Set the focus to the new design area
  this.designArea = new DesignArea(this.designAreaId);
  new CommandListener(this);
}

/**
 * Establece que el diseño de esta pestaña es ha sido guardado
 */
DesignTab.prototype.setIsSaved = function(){
  this.isSaved = true;
  if (this.isNew) {
    this.isNew = false;
  }
  var newTitle = this.designName;
  this.panel.setTitle(newTitle);
}

/**
 * Establece que el diseño de esta pestaña ha sufrido cambios que no han sido guardados
 */
DesignTab.prototype.setNotSaved = function(){
  if (this.isSaved) {
    this.isSaved = false;
    var newTitle = this.designName + '*';
    this.panel.setTitle(newTitle);
  }
}

/**
 * Devuelve el panel que encapsula esta pestaña de diseño
 * @returns {Ext.Panel} Panel que encapsula esta pestaña de diseño
 */
DesignTab.prototype.getPanel = function(){
  return this.panel;
}

/**
 * Devuelve el área de diseño que encapsula esta pestaña de diseño
 * @returns {DesignArea} Área de diseño que encapsula esta pestaña de diseño
 */
DesignTab.prototype.getDesignArea = function(){
  return this.designArea;
}

/**
 * Indica si el diseño ha sido guardado y no ha sufrido cambios desde entonces
 * @returns {Boolean} FALSE solo si el diseño ha sufrido cambios desde la última vez que se guardó
 */
DesignTab.prototype.getIsSaved = function(){
  return this.isSaved;
}

/**
 * Establece que el diseño de esta pestaña es nuevo
 */
DesignTab.prototype.setIsNew = function(){
  this.isNew = true;
  this.setNotSaved();
}

/**
 * Indica si el diseño de esta pestaña es nuevo
 * @returns {Boolean} TRUE solo si el diseño de esta pestaña es nuevo
 */
DesignTab.prototype.getIsNew = function(){
  return this.isNew;
}

/**
 * Asigna el nombre del diseño que está cargado
 * @param {String} designName Nombre del diseño
 */
DesignTab.prototype.setDesignName = function(designName){
  this.designName = designName;
}

/**
 * Devuelve el nombre del diseño que está actualmente cargado en esta pestaña
 * @param {String} designName Nombre del diseño que está actualmente cargado
 */
DesignTab.prototype.getDesignName = function(){
  return this.designName;
}
