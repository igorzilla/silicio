/* 
	the format of the tree definition file is simple,
	you can find specification in the Tigra Menu documentation at:
	
	http://www.softcomplex.com/products/tigra_menu/docs/items.html	
*/

var TREE_ITEMS = [
//	['GW UML', 'html/splash.htm', /*Ra�z del �rbol*/
	['SILICIO', 'html/splash.htm', /*Ra�z del �rbol*/
		['Uso de la ayuda', 'html/conocimientos/uso_de_la_ayuda.htm'],
		['Introducci&oacute;n', 'html/conocimientos/introduccion.htm'], //Introducci�n acerca de 
		['Conocimientos previos', 'html/conocimientos/_index.htm',
			['Pantalla principal', 'html/conocimientos/pantalla_principal.htm'],
			['Panel de herramientas', 'html/conocimientos/panel_herramientas.htm']
//			['Cerrar sesi&oacute;n', 'html/conocimientos/fin_sesion.htm'],			
		],
		['Manejo de la aplicaci&oacute;n', 'html/manejo/_index.htm',
		    ['Ingresar a SILICIO', 'html/manejo/ingresar.htm'],
    		['Crear un dise&ntilde;o', 'html/manejo/crear_diseno.htm'],
				['Abrir un dise&ntilde;o', 'html/manejo/abrir_diseno.htm'],
				['Renombrar un dise&ntilde;o', 'html/manejo/renombrar_diseno.htm'],
				['Eliminar un dise&ntilde;o', 'html/manejo/eliminar_diseno.htm']
//			['Tipos de Vistas', 'html/manejo/explicacion_vistas.htm'],
//			['Tipos de conexiones entre estereotipos', 'html/manejo/explicacion_conexiones.htm'],						
		],
		['Acerca de esta gu&iacute;a', 'html/acerca_de.htm'],
	] /*Cierra la Ra�z del �rbol*/
	
]; /*Cierra el �rbol*/

//==========================================================================================
