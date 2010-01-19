MainController = function(){
  //TODO: Implementing the singleton pattern here
  this.workflow = null;
  this.paintArea = null;
  this.toolsPanel = null;
  this.toolBar = null;
}

MainController.prototype.buildWorkflow = function(){
  this.workflow = new draw2d.Workflow("paintarea");
  this.workflow.setBackgroundImage("/images/grid.png", true);
  this.paintArea = new Ext.Panel({
    region: 'center',
    xtype: 'panel',
    contentEl: "paintarea"
  });
}

MainController.prototype.buildToolsPanel = function(){
  var basicGatesPanel = new Ext.Panel({
    split: true,
    width: 200,
    minSize: 200,
    title: 'Compuertas básicas'
  });
  basicGatesPanel.add({
    contentEl: 'AND_cover',
    width: 200,
    height: 100,
    border: false
  });
  basicGatesPanel.add({
    xtype: 'panel',
    contentEl: 'OR_cover',
    width: 200,
    height: 100,
    border: false
  });
  basicGatesPanel.add({
    xtype: 'panel',
    contentEl: 'NOT_cover',
    width: 200,
    height: 100,
    border: false
  });
  var inputs = new Ext.Panel({
    split: true,
    width: 200,
    minSize: 200,
    title: 'Entradas'
  });
  var outputs = new Ext.Panel({
    split: true,
    width: 200,
    minSize: 200,
    title: 'Salidas'
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
    items: [basicGatesPanel, inputs, outputs]
  });
  this.toolsPanel.doLayout();
}

MainController.prototype.buildToolBar = function(){
  var workflow = this.workflow;
  var saveAction = new Ext.Action({
    text: 'Guardar',
    handler: function(){
      var design = new Design(workflow.getDocument().getFigures());
      var xmlDesignCode = design.toXML();
      if (xmlDesignCode != null) {
        //        Ext.Msg.alert('Código XML', xmlDesignCode);
        Ext.Ajax.request({
          url: '/index.php/designsManagement/saveDesign',
          params: {
            xml_design_code: xmlDesignCode
          },
          success: function(result, request){
						Ext.Msg.alert('Exito', result.responseText);          
          },
          failure: function(result, request){
						mainController.generateError('Falló petición AJAX: '+result.statusText);        
          }
        });
      }
      else {
        var errorMessage = design.getErrorMessage();
        mainController.generateError(errorMessage);
      }
    }
  });
  this.toolBar = new Ext.Toolbar({
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
  });
}

MainController.prototype.buildWorkArea = function(){
  this.viewport = new Ext.Viewport({
    layout: 'border',
    renderTo: Ext.getBody(),
    items: [{
      region: 'north',
      xtype: 'panel',
      titlebar: true,
      title: 'SILICIO',
      height: 53,
      items: [this.toolBar]
    }, this.toolsPanel, this.paintArea]
  });
  //    workflow.scrollArea = document.getElementById("paintarea").parentNode;
  this.workflow.getCommandStack().addCommandStackEventListener(new CommandListener());
}

MainController.prototype.turnOnDragAndDrop = function(){
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
}

MainController.prototype.generateError = function(message){
  Ext.Msg.alert('Error', message);
}
