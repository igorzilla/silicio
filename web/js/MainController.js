/**
 * Crea un controlador principal
 * @class Controlador principal de la aplicación(solo se puede instanciar una vez)
 * @author Pedro Bonilla &lt;pedroabp5@gmail.com&gt;
 */
MainController = function(){
  //TODO: Implementing the singleton pattern here
  /**
   * Panel de herramientas
   * @type Ext.Panel
   * @private
   */
  this.toolsPanel = null;
  /**
   * Barra de menú
   * @type Ext.Toolbar
   * @private
   */
  this.menuBar = null;
  /**
   * Panel de pestañas
   * @type Ext.TabPanel
   * @private
   */
  this.tabsPanel = null;
  
  this.buildTabsPanel();
  this.buildToolsPanel();
  this.buildMenuBar();
  this.buildWorkArea();
  this.turnOnDrag();
}

/**
 * Construye el panel de herramientas. En este lugar se situarán todos los componentes
 * disponibles para la construcción de los circuitos
 */
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

/**
 * Construye el panel de pestañas. En este lugar estarán todos los diseños
 * en los cuales esté trabajando el usuario(una pestaña por cada diseño).
 */
MainController.prototype.buildTabsPanel = function(){
  this.tabsPanel = new Ext.TabPanel({
    region: 'center',
    activeItem: 0,
    enableTabScroll: true,
    listeners: {
      tabchange: function(tabPanel, newActivePanel){
        if (newActivePanel.designArea) {
          // This line is to improve compatibility with Google Chrome when you press 'Del' key
          // over a component after changing the tab
          newActivePanel.designArea.html.focus();
        }
      }
    },
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

/**
 * Construye la barra de menú.
 */
MainController.prototype.buildMenuBar = function(){
  //  var workflow = this.workflow;
  
  var tabsPanel = this.tabsPanel;
  
  var mainController = this;
  
  var newDesignAction = new Ext.Action({
    text: 'Nuevo diseño',
    iconCls: 'new_action',
    handler: function(){
      var newDesignAreaId = DesignArea.generateNewDesignAreaId();
      var newTab = new Ext.Panel({
        title: newDesignAreaId,
        iconCls: 'design_area_tab',
        closable: true,
        html: '<div id="' + newDesignAreaId + '" style="position: relative; width: 3000px; height: 3000px;"></div>'
      });
      tabsPanel.add(newTab);
      newTab.show();
      var newDesignArea = new DesignArea(newDesignAreaId, true);
      newTab.designArea = newDesignArea;
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
              Ext.Msg.wait('Eliminando...');
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
      var activeDesignArea = tabsPanel.getActiveTab().designArea;
      var xmlDesignCode = activeDesignArea.toXML();
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

/**
 * Construye el área de trabajo principal. En este lugar se situan: el panel de herramientas,
 * la barra de menú y el área de diseño.
 */
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
    }, this.toolsPanel, this.tabsPanel]
  });
}

/**
 * Habilita la característica Drag(arrastrar), que permite deslizar los componentes desde
 * el panel de herramientas hasta el área de diseño.
 */
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

/**
 * Muestra una ventana con un mensaje de error
 * @param {String} message Mensaje de error que será mostrado
 * @param {Function} callback Función que será invocada después de cerrar la ventana del mensaje de error
 */
MainController.generateError = function(message, callback){
  Ext.Msg.alert('Error', message, callback);
}

/**
 * Genera la URL absoluta para una acción determinada de Symfony
 * @param {String} moduleName Nombre del módulo
 * @param {String} actionName Nombre de la acción
 */
MainController.getAbsoluteUrl = function(moduleName, actionName){
  return urlPrefix + moduleName + '/' + actionName;
}

/**
 * Redirecciona el navegador del usuario a una URL especificada
 * @param {String} url Dirección URL donde se va a redirigir el navegador del usuario
 */
MainController.redirect = function(url){
  document.location = url;
}
