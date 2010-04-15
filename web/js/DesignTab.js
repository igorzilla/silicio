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
  
  this.panel = new Ext.Panel({
    title: title,
    iconCls: 'design_area_tab',
    closable: true,
    html: '<div id="' + this.designAreaId + '" style="position: relative; width: 3000px; height: 3000px;"></div>',
    designTab: this
  });
  
}

DesignTab.prototype.show = function(){
  this.panel.show();
  //TODO: Set the focus to the new design area
  this.designArea = new DesignArea(this.designAreaId);
  new CommandListener(this);
}

DesignTab.prototype.setIsSaved = function(){
  this.isSaved = true;
  if (this.isNew) {
    this.isNew = false;
  }
  var newTitle = this.designName;
  this.panel.setTitle(newTitle);
}

DesignTab.prototype.setNotSaved = function(){
  if (this.isSaved) {
    this.isSaved = false;
    var newTitle = this.designName + '*';
    this.panel.setTitle(newTitle);
  }
}

DesignTab.prototype.getPanel = function(){
  return this.panel;
}

DesignTab.prototype.getDesignArea = function(){
  return this.designArea;
}

DesignTab.prototype.getIsSaved = function(){
  return this.isSaved;
}

DesignTab.prototype.getIsNew = function(){
  return this.isNew;
}

DesignTab.prototype.setDesignName = function(designName){
  this.designName = designName;
}

DesignTab.prototype.getDesignName = function(){
  return this.designName;
}
