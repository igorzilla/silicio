MainController = function(){
  //TODO: Implementing the singleton pattern here
  //  this.workflow = new Array();
  //  this.paintArea = new Array();
  this.toolsPanel = null;
  this.toolBar = null;
  this.tabsPanel = null;
  this.maximumPaintAreaId = 0;
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
  inputs.add({
    xtype: 'panel',
    contentEl: 'light_cover',
    width: 200,
    height: 100,
    border: false
  });
  inputs.add({
    xtype: 'panel',
    contentEl: 'display_cover',
    width: 200,
    height: 100,
    border: false
  });
  var outputs = new Ext.Panel({
    split: true,
    width: 200,
    minSize: 200,
    title: 'Salidas'
  });
  outputs.add({
    xtype: 'panel',
    contentEl: 'switch_cover',
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
    layoutConfig: {
      animate: true
    },
    items: [basicGatesPanel, inputs, outputs]
  });
  this.toolsPanel.doLayout();
}

MainController.prototype.buildTabsPanel = function(){
  this.tabsPanel = new Ext.TabPanel({
    region: 'center',
    activeItem: 0,
    defaults: {
      autoScroll: true
    },
    items: [{
      title: 'Bienvenido',
      html: 'Bienvenido'
    }, {
      title: 'Bienvenido2',
      html: 'Bienvenido2'
    }]
  });
}

MainController.prototype.generatePaintAreaId = function(){
  var newPaintAreaId = this.maximumPaintAreaId;
  this.maximumPaintAreaId = this.maximumPaintAreaId + 1;
  return newPaintAreaId;
}

MainController.turnOnDrop = function(workflow, paintAreaId){
  new Ext.dd.DropTarget(paintAreaId, {
    notifyDrop: function(source, event, data){
      var xCoordinate = event.xy[0] - workflow.getAbsoluteX();
      var yCoordinate = event.xy[1] - workflow.getAbsoluteY();
      var figure = eval('new ' + data.className + '(workflow)');
      workflow.addFigure(figure, xCoordinate, yCoordinate);
      return true;
    }
  });
}

MainController.prototype.buildToolBar = function(){
  //  var workflow = this.workflow;
  
  var tabsPanel = this.tabsPanel;
  
  var mainController = this;
  
  var newDesignAction = new Ext.Action({
    text: 'Nuevo diseño',
    handler: function(){
      var newPaintAreaId = 'paint_area_' + mainController.generatePaintAreaId();
      var newTab = new Ext.Panel({
        title: newPaintAreaId,
        closable: true,
        html: '<div id="' + newPaintAreaId + '" style="position: relative; width: 3000px; height: 3000px;"></div>'
      });
      tabsPanel.add(newTab);
      newTab.show();
      var newWorkflow = new draw2d.Workflow(newPaintAreaId);
      newWorkflow.setBackgroundImage("/images/grid.png", true);
			newWorkflow.getCommandStack().addCommandStackEventListener(new CommandListener());
			MainController.turnOnDrop(newWorkflow,newPaintAreaId);
    }
  });
  
  var designsStore = new Ext.data.Store({
    url: MainController.getAbsoluteUrl('designsManagement', 'listDesigns'),
    reader: new Ext.data.JsonReader({
      root: 'designs'
    }, [{
      name: 'name'
    }, {
      name: 'created_at'
    }, {
      name: 'updated_at'
    }])
  });
  
  var manageDesignsGrid = new Ext.grid.GridPanel({
    frame: true,
    header: false,
    width: 400,
    height: 300,
    columns: [{
      header: 'Nombre',
      dataIndex: 'name'
    }, {
      header: 'Creado en',
      dataIndex: 'created_at',
      width: 110
    }, {
      header: 'Última modificación',
      dataIndex: 'updated_at',
      width: 110
    }],
    store: designsStore,
    sm: new Ext.grid.RowSelectionModel({
      singleSelect: true
    })
  });
  
  var cancelAction = new Ext.Action({
    text: 'Cancelar',
    iconCls: 'cancel_action',
    iconAlign: 'top',
    scale: 'large',
    handler: function(){
      manageDesignsPopup.hide();
    }
  });
  
  var deleteAction = new Ext.Action({
    text: 'Eliminar diseño',
    iconCls: 'delete_action',
    iconAlign: 'top',
    scale: 'large',
    handler: function(){
      var selectionModel = manageDesignsGrid.getSelectionModel();
      if (selectionModel.getCount() < 1) {
        MainController.generateError('Debe seleccionar un diseño');
      }
      else {
        var selectedRow = selectionModel.getSelected();
        var selectedDesignName = selectedRow.get('name');
        Ext.Msg.show({
          title: 'Eliminar diseño',
          msg: '¿Está seguro(a) de eliminar este diseño?<br></br>Esta operación no puede revertirse',
          buttons: Ext.Msg.YESNO,
          fn: function(button){
            if (button == 'yes') {
              Ext.Msg.wait('Deleting...');
              Ext.Ajax.request({
                url: MainController.getAbsoluteUrl('designsManagement', 'deleteDesign'),
                params: {
                  'design_name': selectedDesignName
                },
                success: function(result, request){
                  designsStore.load({
                    callback: function(){
                      Ext.Msg.hide();
                    }
                  });
                },
                failure: function(result, request){
                  MainController.generateError(result.statusText);
                }
              });
            }
          }
        });
      }
    }
  });
  
  var loadAction = new Ext.Action({
    text: 'Abrir diseño',
    iconCls: 'load_action',
    iconAlign: 'top',
    scale: 'large',
    handler: function(){
    
    }
  });
  
  var manageDesignsPopup = new Ext.Window({
    applyTo: 'manage_designs_div',
    title: 'Administración de diseños',
    layout: 'fit',
    width: 400,
    height: 300,
    closeAction: 'hide',
    resizable: false,
    items: [manageDesignsGrid],
    buttonAlign: 'center',
    buttons: [cancelAction, deleteAction, loadAction]
  });
  
  var manageDesignsAction = new Ext.Action({
    text: 'Administrar diseños',
    handler: function(){
      if (manageDesignsPopup.hidden) {
        designsStore.load({
          callback: function(){
            manageDesignsPopup.show('file_menu');
          }
        });
      }
    }
  });
  
  var saveAction = new Ext.Action({
    text: 'Guardar diseño',
    iconCls: 'save_action',
    handler: function(){
      var design = new Design(workflow.getDocument().getFigures());
      var xmlDesignCode = design.toXML();
      Ext.Msg.prompt('Guardar diseño', 'Digite el nombre del diseño', function(button, answer){
        if (button == 'ok') {
          if (answer != '') {
            if (xmlDesignCode != null) {
              Ext.Ajax.request({
                url: MainController.getAbsoluteUrl('designsManagement', 'saveDesign'),
                params: {
                  design_name: answer,
                  xml_design_code: xmlDesignCode
                },
                success: function(result, request){
                  if (result.responseText != 'Ok') {
                    MainController.generateError(result.responseText);
                  }
                },
                failure: function(result, request){
                  MainController.generateError(result.statusText);
                }
              });
            }
            else {
              var errorMessage = design.getErrorMessage();
              MainController.generateError(errorMessage);
            }
          }
          else {
            MainController.generateError('Debe digitar un nombre para el diseño', function(){
              saveAction.execute();
            });
          }
        }
      });
    }
  });
  var closeSessionAction = new Ext.Action({
    text: 'Cerrar sesión',
    iconCls: 'close_session_action',
    handler: function(){
      Ext.Ajax.request({
        url: MainController.getAbsoluteUrl('authentication', 'logout'),
        success: function(result, request){
          var authenticationAction = MainController.getAbsoluteUrl('authentication', 'index');
          document.location = authenticationAction;
        },
        failure: function(result, request){
          MainController.generateError(result.statusText);
        }
      });
    }
  });
  this.toolBar = new Ext.Toolbar({
    xtype: 'toolbar',
    items: [{
      id: 'file_menu',
      xtype: 'button',
      text: 'Archivo',
      menu: [newDesignAction, manageDesignsAction, saveAction, closeSessionAction]
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
    }, this.toolsPanel,
 this.tabsPanel]
  });
}

MainController.prototype.turnOnDrag = function(){
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
  new Ext.dd.DragSource("display", {
    dragData: {
      className: 'Display'
    }
  });
  new Ext.dd.DragSource("light", {
    dragData: {
      className: 'Light'
    }
  });
  new Ext.dd.DragSource("switch", {
    dragData: {
      className: 'Switch'
    }
  });
}

MainController.generateError = function(message, callback){
  Ext.Msg.alert('Error', message, callback);
}

MainController.getAbsoluteUrl = function(moduleName, actionName){
  return urlPrefix + moduleName + '/' + actionName;
}

MainController.redirect = function(url){
  document.location = url;
}
