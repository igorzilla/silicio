function buildWorkArea(){
    var workflow = new draw2d.Workflow("paintarea");
    workflow.setBackgroundImage("/images/grid_10.png", true);
    var gates = new Ext.Panel({
        region: 'west',
        xtype: 'panel',
        split: true,
        width: 200,
        collapsible: true,
        collapseMode: 'mini',
        minSize: 200,
        title: 'Compuertas'
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
                    }, {
                        text: 'Guardar'
                    }, {
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
        }, gates, {
            region: 'center',
            xtype: 'panel',
            contentEl: "paintarea"
        }]
    });
    gates.add({
        contentEl: 'AND_cover',
        width: 200,
        height: 100,
        border: false
    });
    //    workflow.scrollArea = document.getElementById("paintarea").parentNode;
    new Ext.dd.DragSource("AND");
    new Ext.dd.DropTarget("paintarea", {
        notifyDrop: function(source, event, data){
            //            workflow.addFigure(new draw2d.ImageFigure("/images/AND.gif"), event.xy[0] - workflow.getAbsoluteX(), event.xy[1] - workflow.getAbsoluteY());
			workflow.addFigure(new AndGate(workflow),event.xy[0] - workflow.getAbsoluteX(), event.xy[1] - workflow.getAbsoluteY());            
            return true;
        }
    });
    gates.add({
        xtype: 'panel',
        contentEl: 'OR',
        width: 200,
        height: 100,
        border: false
    });
    gates.add({
        xtype: 'panel',
        contentEl: 'NOT',
        width: 200,
        height: 100,
        border: false
    });
    gates.doLayout();
}
