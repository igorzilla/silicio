/**
 * Crea un controlador principal
 * @class Controlador principal de la aplicación(solo se debe instanciar una vez)
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
  
  this.loadBaseClasses();
  this.buildTabsPanel();
  this.buildToolsPanel();
  this.buildMenuBar();
  this.buildWorkArea();
}

/**
 * Ejecuta la carga de las clases(desde el servidor) imprescindibles para el funcionamiento de la aplicación
 */
MainController.prototype.loadBaseClasses = function(){
  var baseClasses = ['ReceivingPort', 'TransmittingPort', 'Component', 'TwoInputBasicGate', 'CommandListener', 'SimulationQueue', 'DesignArea', 'DesignTab'];
  MainController.loadRemoteClasses(baseClasses);
}

/**
 * Inserta un ícono de un componente dentro del panel especificado. Dicho panel debe corresponder a un panel de
 * la barra de herramientas.
 * @param {Ext.Panel} panel Panel de la barra de herramientas
 * @param {Object} parameters Objeto literal con los siguientes atributos: className y height
 * @private
 */
MainController.prototype.insertComponent = function(panel, parameters){
  var iconDiv = parameters.className + '_icon';
  panel.add({
    contentEl: parameters.className + '_cover',
    width: 200,
    height: parameters.height,
    border: false
  });
  new Ext.dd.DragSource(iconDiv, {
    dragData: {
      className: parameters.className
    }
  });
  new Ext.ToolTip({
    target: iconDiv,
    showDelay: 1000,
    autoWidth: true,
    anchor: 'left',
    dismissDelay: 0,
    trackMouse: true,
    html: '<img style="padding: 5px" src="' + rootUrl + '/tooltips/' + parameters.className + '.png"></img>'
  });
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
  this.insertComponent(basicGatesPanel, {
    height: 80,
    className: 'AndGate'
  });
  this.insertComponent(basicGatesPanel, {
    height: 80,
    className: 'OrGate'
  });
  this.insertComponent(basicGatesPanel, {
    height: 80,
    className: 'NotGate'
  });
  this.insertComponent(basicGatesPanel, {
    height: 80,
    className: 'NandGate'
  });
  this.insertComponent(basicGatesPanel, {
    height: 80,
    className: 'NorGate'
  });
  this.insertComponent(basicGatesPanel, {
    height: 80,
    className: 'XorGate'
  });
  var chips = new Ext.Panel({
    split: true,
    width: 200,
    minSize: 200,
    title: 'Circuitos integrados'
  });
  this.insertComponent(chips, {
    height: 100,
    className: 'Chip7447'
  });
  this.insertComponent(chips, {
    height: 100,
    className: 'Chip7473'
  });
  this.insertComponent(chips, {
    height: 100,
    className: 'Chip7483'
  });
  var inputs = new Ext.Panel({
    split: true,
    width: 200,
    minSize: 200,
    title: 'Entradas'
  });
  this.insertComponent(inputs, {
    height: 100,
    className: 'Light'
  });
  this.insertComponent(inputs, {
    height: 100,
    className: 'Display'
  });
  var outputs = new Ext.Panel({
    split: true,
    width: 200,
    minSize: 200,
    title: 'Salidas'
  });
  this.insertComponent(outputs, {
    height: 100,
    className: 'Switch'
  });
  this.insertComponent(outputs, {
    height: 100,
    className: 'Clock'
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
    items: [basicGatesPanel, chips, inputs, outputs]
  });
  this.toolsPanel.doLayout();
}

/**
 * Construye el panel de pestañas. En este lugar estarán todos los diseños
 * en los cuales esté trabajando el usuario(una pestaña por cada diseño).
 */
MainController.prototype.buildTabsPanel = function(){
  var mainController = this;
  this.tabsPanel = new Ext.TabPanel({
    region: 'center',
    activeItem: 0,
    enableTabScroll: true,
    defaults: {
      autoScroll: true
    },
    items: [{
      title: 'Bienvenido',
      html: 'Bienvenido'
    }],
    listeners: {
      tabchange: function(tabPanel, newActivePanel){
        if (newActivePanel.designTab) {
          var activeDesignTab = newActivePanel.designTab;
          var activeDesignArea = activeDesignTab.getDesignArea();
          if (activeDesignArea) {
            mainController.updateSimulateAction();
            // This line is to improve compatibility with Google Chrome when you press 'Del' key
            // over a component after changing the tab
            activeDesignArea.html.focus();
          }
        }
        else {
          mainController.updateSimulateAction();
        }
      },
      beforeremove: function(tabsPanel, panel){
        if (!panel.designTab.getIsSaved()) {
          var closeTab = confirm('Este diseño no ha sido guardado. ¿Está seguro(a) que desea cerrarlo?');
          return closeTab;
        }
      }
    }
  });
}

/**
 * Construye la barra de menú.
 */
MainController.prototype.buildMenuBar = function(){
  //TODO: Configure the scope of the actions
  var tabsPanel = this.tabsPanel;
  
  var mainController = this;
  
  var newDesignAction = new Ext.Action({
    text: 'Nuevo diseño',
    iconCls: 'new_action',
    scope: this,
    handler: function(){
      var designTab = new DesignTab();
      this.tabsPanel.add(designTab.getPanel());
      designTab.show();
      this.updateSimulateAction();
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
      dataIndex: 'name',
      width: 150
    }, {
      header: 'Creado en',
      dataIndex: 'created_at',
      width: 120
    }, {
      header: 'Última modificación',
      dataIndex: 'updated_at',
      width: 120
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
    scope: this,
    handler: function(){
      var selectionModel = manageDesignsGrid.getSelectionModel();
      if (selectionModel.getCount() < 1) {
        MainController.generateError('Debe seleccionar un diseño');
      }
      else {
        manageDesignsPopup.hide();
        Ext.Msg.wait('Cargando diseño...');
        var selectedRow = selectionModel.getSelected();
        var selectedDesignName = selectedRow.get('name');
        var componentRecord = Ext.data.Record.create(['class', 'id', 'xCoordinate', 'yCoordinate']);
        var componentsStore = new Ext.data.Store({
          url: MainController.getAbsoluteUrl('designsManagement', 'getComponentsXML'),
          reader: new Ext.data.XmlReader({
            record: 'component'
          }, componentRecord)
        });
        
        var designTab = new DesignTab(selectedDesignName);
        this.tabsPanel.add(designTab.getPanel());
        designTab.show();
        
        var designArea = designTab.getDesignArea();
        
        componentsStore.load({
          params: {
            design_name: selectedDesignName
          },
          callback: function(componentRecords, options, success){
            if (success) {
              var undefinedClasses = new Array();
              for (var i = 0; i < componentRecords.length; i++) {
                var componentRecord = componentRecords[i];
                var className = componentRecord.get('class');
                undefinedClasses[i] = className;
              }
              
              MainController.loadRemoteClasses(undefinedClasses, function(){
                for (var i = 0; i < componentRecords.length; i++) {
                  var componentRecord = componentRecords[i];
                  var className = componentRecord.get('class');
                  var id = componentRecord.get('id');
                  var xCoordinate = Number(componentRecord.get('xCoordinate'));
                  var yCoordinate = Number(componentRecord.get('yCoordinate'));
                  var component = eval('new ' + className + '(id)');
                  designArea.addFigure(component, xCoordinate, yCoordinate);
                }
                
                var connectionRecord = Ext.data.Record.create(['sourceId', 'sourcePortIndex', 'targetId', 'targetPortIndex']);
                var connectionsStore = new Ext.data.Store({
                  url: MainController.getAbsoluteUrl('designsManagement', 'getConnectionsXML'),
                  reader: new Ext.data.XmlReader({
                    record: 'connection'
                  }, connectionRecord)
                });
                connectionsStore.load({
                  params: {
                    design_name: selectedDesignName
                  },
                  callback: function(connectionRecords, options, success){
                    if (success) {
                      for (var i = 0; i < connectionRecords.length; i++) {
                        var connectionRecord = connectionRecords[i];
                        var document = designArea.getDocument();
                        var sourceId = connectionRecord.get('sourceId');
                        var sourceComponent = document.getFigure(sourceId);
                        var sourcePortIndex = Number(connectionRecord.get('sourcePortIndex'));
                        var sourcePort = sourceComponent.getOutputPort(sourcePortIndex);
                        var targetId = connectionRecord.get('targetId');
                        var targetComponent = document.getFigure(targetId);
                        var targetPortIndex = Number(connectionRecord.get('targetPortIndex'));
                        var targetPort = targetComponent.getInputPort(targetPortIndex);
                        var connection = new draw2d.Connection();
                        connection.setSource(sourcePort);
                        connection.setTarget(targetPort);
                        designArea.addFigure(connection);
                      }
                    }
                  }
                });
                Ext.Msg.hide();
              });
            }
          }
        });
        
        this.updateSimulateAction();
      }
    }
  });
  
  var renameDesignAction = new Ext.Action({
    text: 'Renombrar',
    iconCls: 'rename_action',
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
        Ext.Msg.prompt('Renombrar diseño', 'Digite el nuevo nombre del diseño', function(button, answer){
          if (button == 'ok') {
            if (answer != '') {
              Ext.Ajax.request({
                url: MainController.getAbsoluteUrl('designsManagement', 'renameDesign'),
                params: {
                  old_design_name: selectedDesignName,
                  new_design_name: answer
                },
                success: function(result, request){
                  if (result.responseText != 'Ok') {
                    MainController.generateError(result.responseText);
                  }
                  else {
                    designsStore.load();
                  }
                },
                failure: function(result, request){
                  MainController.generateError(result.statusText);
                }
              });
            }
            else {
              MainController.generateError('Debe digitar un nombre para el diseño', function(){
                renameDesignAction.execute();
              });
            }
          }
        }, null, null, selectedDesignName);
      }
    }
  });
  
  var manageDesignsPopup = new Ext.Window({
    applyTo: 'manage_designs_div',
    title: 'Administración de diseños',
    layout: 'fit',
    width: 500,
    height: 300,
    closeAction: 'hide',
    resizable: false,
    items: [manageDesignsGrid],
    buttonAlign: 'center',
    buttons: [cancelAction, deleteAction, renameDesignAction, loadAction]
  });
  
  var manageDesignsAction = new Ext.Action({
    text: 'Administrar diseños',
    iconCls: 'manage_designs_action',
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
      var activeDesignTab = tabsPanel.getActiveTab().designTab;
      if (!activeDesignTab) {
        MainController.generateError('Debe seleccionar un área de diseño');
      }
      else 
        if (!activeDesignTab.getIsSaved()) {
          var activeDesignArea = activeDesignTab.getDesignArea();
          var xmlContainer = activeDesignArea.toSplittedXML();
          var componentsXml = xmlContainer.componentsXml;
          var connectionsXml = xmlContainer.connectionsXml;
          if (activeDesignTab.getIsNew()) {
            Ext.Msg.prompt('Guardar diseño', 'Digite el nombre del diseño', function(button, answer){
              if (button == 'ok') {
                if (answer != '') {
                  Ext.Ajax.request({
                    url: MainController.getAbsoluteUrl('designsManagement', 'saveDesign'),
                    params: {
                      design_name: answer,
                      components_xml: componentsXml,
                      connections_xml: connectionsXml
                    },
                    success: function(result, request){
                      if (result.responseText != 'Ok') {
                        MainController.generateError(result.responseText);
                      }
                      else {
                        var designName = answer;
                        activeDesignTab.setDesignName(designName);
                        activeDesignTab.setIsSaved();
                      }
                    },
                    failure: function(result, request){
                      MainController.generateError(result.statusText);
                    }
                  });
                }
                else {
                  MainController.generateError('Debe digitar un nombre para el diseño', function(){
                    saveAction.execute();
                  });
                }
              }
            });
          }
          else {
            Ext.Ajax.request({
              url: MainController.getAbsoluteUrl('designsManagement', 'updateDesign'),
              params: {
                design_name: activeDesignTab.getDesignName(),
                components_xml: componentsXml,
                connections_xml: connectionsXml
              },
              success: function(result, request){
                if (result.responseText != 'Ok') {
                  MainController.generateError(result.responseText);
                }
                else {
                  activeDesignTab.setIsSaved();
                }
              },
              failure: function(result, request){
                MainController.generateError(result.statusText);
              }
            });
          }
        }
    }
  });
  
  var saveAsAction = new Ext.Action({
    text: 'Guardar diseño como...',
    iconCls: 'save_as_action',
    handler: function(){
      var activeDesignTab = tabsPanel.getActiveTab().designTab;
      if (!activeDesignTab) {
        MainController.generateError('Debe seleccionar un área de diseño');
      }
      else {
        activeDesignTab.setIsNew();
        saveAction.execute();
      }
    }
  });
  
  var closeSessionAction = new Ext.Action({
    text: 'Cerrar sesión',
    iconCls: 'close_session_action',
    handler: function(){
      //TODO: verify that all designs are saved
      Ext.Msg.wait('Cerrando la aplicación...');
      Ext.Ajax.request({
        url: MainController.getAbsoluteUrl('authentication', 'logout'),
        success: function(result, request){
          Ext.Ajax.request({
            url: MainController.getAbsoluteUrl('authentication', 'indexAjax'),
            success: function(result, request){
              document.body.innerHTML = result.responseText;
              
              authenticationController = new AuthenticationController();
              
              Ext.Msg.hide();
            },
            failure: function(result, request){
              //TODO: redirect to authentication page
              MainController.generateError(result.statusText);
            }
          });
        },
        failure: function(result, request){
          //TODO: redirect to authentication page
          MainController.generateError(result.statusText);
        }
      });
    }
  });
  
  this.simulateAction = new Ext.Action({
    text: 'Simular',
    iconCls: 'simulate_action',
    scope: this,
    handler: function(){
      var activeDesignTab = tabsPanel.getActiveTab().designTab;
      var activeDesignArea = activeDesignTab.getDesignArea();
      if (activeDesignArea.getMode() == DesignArea.EDIT_MODE) {
        activeDesignArea.turnOnSimulationMode();
      }
      else {
        activeDesignArea.turnOnEditMode();
      }
      this.updateSimulateAction();
    }
  });
  
  this.toolBar = new Ext.Toolbar({
    xtype: 'toolbar',
    items: [{
      id: 'file_menu',
      xtype: 'button',
      text: 'Archivo',
      menu: [newDesignAction, manageDesignsAction, saveAction, saveAsAction, closeSessionAction]
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
    }, '->', this.simulateAction, closeSessionAction]
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
 * Actualiza el ícono y etiqueta de la opción "Simular"/"Detener"
 */
MainController.prototype.updateSimulateAction = function(){
  var activeDesignTab = this.tabsPanel.getActiveTab().designTab;
  if (activeDesignTab) {
    var activeDesignArea = activeDesignTab.getDesignArea();
    if (activeDesignArea.getMode() == DesignArea.EDIT_MODE) {
      this.simulateAction.setIconClass('simulate_action');
      this.simulateAction.setText('Simular');
    }
    else {
      this.simulateAction.setIconClass('stop_action');
      this.simulateAction.setText('Detener');
    }
    if (this.simulateAction.isDisabled()) {
      this.simulateAction.enable();
    }
  }
  else {
    this.simulateAction.setIconClass('simulate_action');
    this.simulateAction.setText('Simular');
    this.simulateAction.disable();
  }
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
 * Muestra un mensaje de error de validación para el código especificado
 * @param {Integer} errorCode Código del error de validación
 */
MainController.generateValidationError = function(errorCode){
  var errorMessage = '';
  switch (errorCode) {
    case DesignArea.NO_ALLOWED_IN_SIMULATION_MODE:
      errorMessage = 'Detenga la simulación antes de editar el diseño';
      break;
    case DesignArea.SEVERAL_CONNECTIONS_ON_INPUT_PORT:
      errorMessage = 'Solo una conexión por cada puerto de entrada';
      break;
  }
  MainController.generateError(errorMessage);
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

/**
 * Determina si una clase ya ha sido definida
 * @param {Boolean} className FALSE solo si la clase no ha sido definida
 */
MainController.classIsDefined = function(className){
  return eval('typeof ' + className + ' != "undefined"');
}

/**
 * Carga una lista de clases Javascript desde el servidor(secuencialmente)
 * @param {Array} undefinedClasses Arreglo con los nombres de las clases
 * @param {Function} callback Función que es llamada después de cargar todas las clases
 * @param {Integer} from Posición del arreglo desde la cual se cargarán las clases
 */
MainController.loadRemoteClasses = function(undefinedClasses, callback, from){
  if (!from) {
    from = 0;
  }
  if (from < undefinedClasses.length) {
    var className = undefinedClasses[from];
    from = from + 1;
    if (from == undefinedClasses.length) {
      MainController.loadRemoteClass(className, callback);
    }
    else {
      MainController.loadRemoteClass(className, function(){
        MainController.loadRemoteClasses(undefinedClasses, callback, from);
      });
    }
  }
}

/**
 * Carga una clase Javascript desde el servidor
 * @param {String} className Nombre de la clase
 * @param {Function} callback Función que es llamada después de cargar la clase
 */
MainController.loadRemoteClass = function(className, callback){
  if (MainController.classIsDefined(className) && callback) {
    callback();
  }
  else {
    Ext.Ajax.request({
      url: rootUrl + '/js/' + className + '.js',
      method: 'GET',
      disableCaching: false,
      success: function(result, request){
        eval(result.responseText);
        if (callback) {
          callback();
        }
      },
      failure: function(result, request){
        MainController.generateError(result.statusText);
      }
    });
  }
}

//MainController.loadRemoteJavascriptFiles = function(files){
//  var body = Ext.getBody();
//  for (var i = 0; i < files.length; i++) {
//    var fileName = files[i];
//    var scriptElement = new Ext.Element(document.createElement('script'));
//    scriptElement.set({
//      type: 'text/javascript',
//      src: rootUrl + '/js/' + fileName
//    });
//    body.appendChild(scriptElement);
//  }
//}
//MainController.loadRemoteJavascriptFiles = function(files, from, temporalCode){
//  if (!from) {
//    from = 0;
//  }
//  if (from < files.length) {
//    var fileName = files[from];
//    from = from + 1;
//    if (from == files.length) {
//      MainController.loadRemoteJavascriptFile(fileName, function(code){
//        if (!temporalCode) {
//          temporalCode = code;
//        }
//        else {
//          temporalCode = temporalCode + code;
//        }
//        eval(temporalCode);
//      });
//    }
//    else {
//      MainController.loadRemoteJavascriptFile(fileName, function(code){
//        if (!temporalCode) {
//          temporalCode = code;
//        }
//        else {
//          temporalCode = temporalCode + code;
//        }
//        MainController.loadRemoteJavascriptFiles(files, from, temporalCode);
//      });
//    }
//  }
//}
//
//MainController.loadRemoteJavascriptFile = function(fileName, callback){
//  Ext.Ajax.request({
//    url: rootUrl + '/js/' + fileName,
//    method: 'GET',
//    disableCaching: false,
//    success: function(result, request){
//      callback(result.responseText);
//    },
//    failure: function(result, request){
//      MainController.generateError(result.statusText);
//    }
//  });
//}
