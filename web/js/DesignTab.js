DesignTab = function(title, isNew){
  this.designAreaId = DesignArea.generateNewDesignAreaId();
  
  this.panel = new Ext.Panel({
    title: title,
    iconCls: 'design_area_tab',
    closable: true,
    html: '<div id="' + this.designAreaId + '" style="position: relative; width: 3000px; height: 3000px;"></div>'
    //		,
    //    listeners: {
    //      afterrender: function(designTab){
    //        designTab.designArea = new DesignArea(designAreaId);
    //      }
  });
  
  //  /**
  //   * Indica si el diseño es nuevo, es decir, que no se ha guardado por primera vez
  //   * @type Boolean
  //   * @private
  //   */
  //  this.isNew = isNew;
  //  
  //  /**
  //   * Indica si el diseño no ha sufrido cambios desde la última vez que se guardó
  //   * @type Boolean
  //   * @private
  //   */
  //  this.isSaved = true;
  //  
  //  if (isNew) {
  //    this.setNotSaved();
  //  }
}

//DesignTab.prototype = new Ext.Panel();
//DesignTab.prototype.constructor = DesignTab;
//DesignTab.prototype.type = 'DesignTab';

DesignTab.prototype.show = function() {
	this.panel.show();
	this.designArea = new DesignArea(this.designAreaId);
}

DesignTab.prototype.setIsSaved = function(){
  this.isSaved = true;
  this.title = this.title.substring(0, this.title.length);
}

DesignTab.prototype.setNotSaved = function(){
  this.isSaved = false;
  this.title += '*';
}

DesignTab.prototype.getPanel = function() {
	return this.panel;
}

DesignTab.prototype.getDesignArea = function(){
  return this.designArea;
}
