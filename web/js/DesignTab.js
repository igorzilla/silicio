DesignTab = function(title){
  this.designAreaId = DesignArea.generateNewDesignAreaId();
  
  this.panel = new Ext.Panel({
    title: title,
    iconCls: 'design_area_tab',
    closable: true,
    html: '<div id="' + this.designAreaId + '" style="position: relative; width: 3000px; height: 3000px;"></div>',
		designTab: this
  });
  
  if (title) {
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
  }
  else {
    this.isNew = true;
    this.panel.title = '(Sin título)';
    this.setNotSaved();
  }
}

DesignTab.prototype.show = function(){
  this.panel.show();
  this.designArea = new DesignArea(this.designAreaId);
}

DesignTab.prototype.setIsSaved = function(){
  this.isSaved = true;
  this.title = this.title.substring(0, this.title.length);
}

DesignTab.prototype.setNotSaved = function(){
  this.isSaved = false;
  this.panel.title += '*';
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
