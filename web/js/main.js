function buildWorkArea(){
  var workflow = new draw2d.Workflow("paintarea");
  workflow.setBackgroundImage("/images/grid_10.png", true);
  var toolsPanel = new Ext.Panel({
    region: 'west',
    xtype: 'panel',
    split: true,
    width: 200,
    collapsible: true,
    collapseMode: 'mini',
    minSize: 200,
    title: 'Herramientas'
  });
  var saveAction = new Ext.Action({
    text: 'Guardar',
    handler: function(){
			var validator = new Validator(workflow.getDocument().getFigures());
			if (validator.isValid()) {
				var serializer = new Serializer(workflow.getDocument().getFigures());
				alert(serializer.serializeToXML());
			}
			else {
				alert(validator.getErrorMessage());
			}
    }
  });
  var viewport = new Ext.Viewport({
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
    }, toolsPanel, {
      region: 'center',
      xtype: 'panel',
      contentEl: "paintarea"
    }]
  });
  //    workflow.scrollArea = document.getElementById("paintarea").parentNode;
  toolsPanel.add({
    contentEl: 'AND_cover',
    width: 200,
    height: 100,
    border: false
  });
  toolsPanel.add({
    xtype: 'panel',
    contentEl: 'OR_cover',
    width: 200,
    height: 100,
    border: false
  });
  toolsPanel.add({
    xtype: 'panel',
    contentEl: 'NOT_cover',
    width: 200,
    height: 100,
    border: false
  });
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
  new Ext.dd.DropTarget("paintarea", {
    notifyDrop: function(source, event, data){
      var xCoordinate = event.xy[0] - workflow.getAbsoluteX();
      var yCoordinate = event.xy[1] - workflow.getAbsoluteY();
      var figure = eval('new ' + data.className + '(workflow)');
      workflow.addFigure(figure, xCoordinate, yCoordinate);
      return true;
    }
  });
  toolsPanel.doLayout();
}
