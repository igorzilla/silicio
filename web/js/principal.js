function iniciar() {
	var workflow = new draw2d.Workflow("paintarea");
	workflow.setBackgroundImage("/images/grid_10.png",true);
	var compuertas = new Ext.Panel({
		region: 'west',
		xtype: 'panel',
		split: true,
		width: 200,
//		html: 'West',
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
					},{
						text: 'Abrir'
					},{
						text: 'Guardar'
					},{
						text: 'Cerrar sesión'
					}]
				},
				'-',{
					xtype: 'button',
					text: 'Editar',
					menu: [{
						text: 'Deshacer'
					},{
						text: 'Rehacer'
					},{
						text: 'Cortar'
					},{
						text: 'Copiar'
					},{
						text: 'Pegar'
					}]
				},
				'-',{
					xtype: 'button',
					text: 'Ayuda',
					menu: [{
						text: 'Contenido'
					},{
						text: 'Acerca de...'
					}]
				}]
			}]
		},
		compuertas,
		{
			region: 'center',
			xtype: 'panel',
			contentEl: "paintarea"
		}
		]
	});
	compuertas.add({
		contentEl: 'AND',
		width: 200,
		height: 100,
		border: false
	});
	compuertas.add({
		xtype: 'panel',
		contentEl: 'OR',
		width: 200,
		height: 100,
		border: false
	});
	compuertas.doLayout();
}