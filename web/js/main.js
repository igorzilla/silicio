MainController = function () {
	this.workflow = null;
	this.basicGatesPanel = null;
	this.toolsPanel = null;
}

MainController.prototype.buildWorkflow = function () {
	this.workflow = new draw2d.Workflow("paintarea");
  this.workflow.setBackgroundImage("/images/grid.png", true);
}

MainController.prototype.buildToolsPanel = function () {
	this.basicGatesPanel = new Ext.Panel({
    split: true,
    width: 200,
    minSize: 200,
    title: 'Compuertas básicas'
  });
  this.basicGatesPanel.add({
    contentEl: 'AND_cover',
    width: 200,
    height: 100,
    border: false
  });
  this.basicGatesPanel.add({
    xtype: 'panel',
    contentEl: 'OR_cover',
    width: 200,
    height: 100,
    border: false
  });
  this.basicGatesPanel.add({
    xtype: 'panel',
    contentEl: 'NOT_cover',
    width: 200,
    height: 100,
    border: false
  });
  this.toolsPanel = new Ext.Panel({
    region: 'west',
    xtype: 'panel',
    split: true,
    width: 200,
    collapsible: true,
    collapseMode: 'mini',
    minSize: 200,
    title: 'Herramientas',
    layout: 'accordion',
    items: [this.basicGatesPanel]
  });
	this.toolsPanel.doLayout();
}

MainController.prototype.buildWorkArea = function(){
	var workflow = this.workflow;
  var saveAction = new Ext.Action({
    text: 'Guardar',
    handler: function(){
      var design = new Design(workflow.getDocument().getFigures());
      var xmlDesignCode = design.toXML();
      if (xmlDesignCode != null) {
        Ext.Msg.alert('Código XML', xmlDesignCode);
      }
      else {
        var errorMessage = design.getErrorMessage();
        Ext.Msg.alert('Error', errorMessage);
      }
    }
  });
  this.viewport = new Ext.Viewport({
    layout: 'border',
    renderTo: Ext.getBody(),
    items: [{
      region: 'north',
      xtype: 'panel',
      titlebar: true,
      title: 'SILICIO',
      height: 53,
      items: [{
        xtype: 'toolbar',
        items: [{
          xtype: 'button',
          text: 'Archivo',
          menu: [{
            text: 'Nuevo diseño'
          }, {
            text: 'Abrir'
          }, saveAction, {
            text: 'Cerrar sesión'
          }]
        }, '-', {
          xtype: 'button',
          text: 'Editar',
          menu: [{
            text: 'Deshacer'
          }, {
            text: 'Rehacer'
          }, {
            text: 'Cortar'
          }, {
            text: 'Copiar'
          }, {
            text: 'Pegar'
          }]
        }, '-', {
          xtype: 'button',
          text: 'Ayuda',
          menu: [{
            text: 'Contenido'
          }, {
            text: 'Acerca de...'
          }]
        }]
      }]
    }, this.toolsPanel, {
      region: 'center',
      xtype: 'panel',
      contentEl: "paintarea"
    }]
  });
  //    workflow.scrollArea = document.getElementById("paintarea").parentNode;
  new Ext.dd.DragSource("AND", {
    dragData: {
      className: 'AndGate'
    }
  });
  new Ext.dd.DragSource("OR", {
    dragData: {
      className: 'OrGate'
    }
  });
  new Ext.dd.DragSource("NOT", {
    dragData: {
      className: 'NotGate'
    }
  });
	var workflow = this.workflow;
  new Ext.dd.DropTarget("paintarea", {
    notifyDrop: function(source, event, data){
      var xCoordinate = event.xy[0] - workflow.getAbsoluteX();
      var yCoordinate = event.xy[1] - workflow.getAbsoluteY();
      var figure = eval('new ' + data.className + '(workflow)');
      workflow.addFigure(figure, xCoordinate, yCoordinate);
      return true;
    }
  });
  
  this.workflow.getCommandStack().addCommandStackEventListener(new CommandListener());
}
