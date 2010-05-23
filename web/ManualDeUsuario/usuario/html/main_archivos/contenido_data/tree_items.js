/* 
	the format of the tree definition file is simple,
	you can find specification in the Tigra Menu documentation at:
	
	http://www.softcomplex.com/products/tigra_menu/docs/items.html	
*/

var TREE_ITEMS = [
	['MapReport', 'html/splash.htm', /*Raíz del Árbol*/
		['Uso de la Ayuda', 'html/conocimientos/ayuda.htm'],
		['Introducci&oacute;n', 'html/conocimientos/_intro.htm'], //Introducción acerca de 
		['Conocimientos esenciales', 'html/conocimientos/_index.htm',
		 	['Iniciar MapReport', 'html/conocimientos/iniciar.htm'],
			['Pantalla principal', 'html/conocimientos/pant_ppal.htm'],
			['Finalizar sesi&oacute;n', 'html/conocimientos/fin_sesion.htm'],
		],
		['Administraci&oacute;n del sistema', 'html/administracion/_index.htm',
		 	['Administrador de estad&iacute;sticas', 'html/administracion/admin_estad.htm'],
			['Administrador de ingreso de datos', 'html/administracion/admin_ingreso_datos/_index.htm',
			 	['Men&uacute;: Temas relacionados', 'html/administracion/admin_ingreso_datos/menu_temas.htm'],
				['Listado de ingresar datos', 'html/administracion/admin_ingreso_datos/list_ingresar.htm'],
			],
			['Administrador de banderillas', 'html/administracion/admin_banderillas/_index.htm',
			 	['Men&uacute;: Temas relacionados', 'html/administracion/admin_banderillas/menu_temas.htm'],
				['Listado de banderillas', 'html/administracion/admin_banderillas/list_banderillas.htm'],
			],
			['Administrador de reportes', 'html/administracion/admin_reportes/_index.htm',
			 	['Men&uacute;: Temas relacionados', 'html/administracion/admin_reportes/menu_temas.htm'],
				['Listado de reportes', 'html/administracion/admin_reportes/list_reportes.htm',
					['Configuraci&oacute;n del reporte', 'html/administracion/admin_reportes/config_reporte.htm',
						['Edici&oacute;n del reporte', 'html/administracion/admin_reportes/edicion_reporte.htm'],
						['Acciones sobre el reporte', 'html/administracion/admin_reportes/accion_reporte.htm'],
					],
					['Ingreso al m&oacute;dulo de filtros', 'html/administracion/admin_reportes/ing_filtros.htm'],
					['Eliminaci&oacute;n de reportes', 'html/administracion/admin_reportes/elim_reportes.htm'],
				],
			],
			['Administrador de perfiles', 'html/administracion/admin_perfiles/_index.htm',
			 	['Men&uacute;: Temas relacionados', 'html/administracion/admin_perfiles/menu_temas.htm'],
				['Listado de perfiles', 'html/administracion/admin_perfiles/list_perfiles.htm'],
			],
			['Administrador de niveles', 'html/administracion/admin_niveles/_index.htm',
			 	['Men&uacute;: Temas relacionados', 'html/administracion/admin_niveles/menu_temas.htm'],
				['Listado de niveles', 'html/administracion/admin_niveles/list_niveles.htm'],
			],
			['Administrador de usuarios', 'html/administracion/admin_usuarios/_index.htm',
			 	['Men&uacute;: Temas relacionados', 'html/administracion/admin_usuarios/menu_temas.htm'],
				['Listado de usuarios', 'html/administracion/admin_usuarios/list_usuarios.htm'],
			],
			
		],
		['Acerca de esta guía', 'html/acerca_de.htm'],
	] /*Cierra la Raíz del Árbol*/
	
]; /*Cierra el Árbol*/

//==========================================================================================