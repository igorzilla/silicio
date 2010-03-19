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
	//TODO: Set the focus to the new design area
  this.designArea = new DesignArea(this.designAreaId);
	new CommandListener(this);
}

DesignTab.prototype.setIsSaved = function(designName){
  this.isSaved = true;
  var newTitle = '';
  if (designName) {
    newTitle = designName;
  }
  else {
    newTitle = newTitle.substring(0, newTitle.length);
  }
  this.panel.setTitle(newTitle);
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

DesignTab.prototype.getIsNew = function () {
	return this.isNew;
}

DesignTab.prototype.getTitle = function() {
	return this.panel.title;
}
