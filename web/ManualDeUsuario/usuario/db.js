/* XSearch version 5.2 - Database file */

/* configuration settings */

searchname = 'resultado.htm'
/*'xsearch-5.2.htm'*/

usebannercode = false
ButtonCode = "<img src='searchbutton.gif' border=0>"

function templateBody(){
  document.write('<html><head><title>B�squeda</title><' +
  'script language="Javascript">' +
  '<' +
  '/' +
  'script' +
  '></head><body bgcolor="#ffffff" text="#000000" link="#000099" vlink="#996699" alink="#996699"><left>' /*<font face="Arial" size="3"><font face=Verdana size=12><b>BUSQUEDA</b><i>CROSS</i></font><table border=0 width=320><tr><td>'*/);
}

function templateEnd(){
  document.write('</td></tr></table></font></center></body></html>');
}

adicionar = function(enlace, titulo, palabrasClaves, descripcion) {
	add('<strong><a href="'+enlace+'" target="right">'+titulo+'</a>', palabrasClaves, descripcion);
}

adicionar('html/conocimientos/uso_de_la_ayuda.htm', 'Uso de la ayuda', 'Uso Ayuda SILICIO Arbol Navegar Buscar Tema', 'Como usar esta ayuda.');
adicionar('html/conocimientos/introduccion.htm', 'Introducci&oacute;n', 'SILICIO Introduccion Compuertas Logicas Circuitos Integrados Interruptores LEDs Generadores Pulsos Reloj Pantallas', 'SILICIO es una herramienta CAD.');
adicionar('html/conocimientos/_index.htm', 'Conocimientos previos', 'Conocimientos previos Ingresar SILICIO Pantalla principal', 'Serie de conocimientos b&aacute;sicos');
adicionar('html/conocimientos/pantalla_principal.htm', 'Pantalla principal', 'Pantalla principal SILICIO Vista general Barra menu Panel herramientas Area de diseno', 'Interfaz principal de SILICIO');
adicionar('html/conocimientos/panel_herramientas.htm', 'Panel de herramientas', 'SILICIO Panel herramientas Compuertas basicas Circuitos integrados Entradas Salidas', 'Consta de 4 secciones');
adicionar('html/manejo/_index.htm', 'Manejo de la aplicaci&oacute;n', 'Manejo aplicacion SILICIO Creacion diseno Panel herramientas', 'Requiere la creaci&oacute;n de un nuevo dise&ntilde;o');
adicionar('html/manejo/ingresar.htm', 'Ingresar a SILICIO', 'Ingresar SILICIO Registrarse Crear Cuenta', 'Pasos para ingresar a SILICIO');
adicionar('html/manejo/crear_diseno.htm', 'Crear un dise&ntilde;o', 'Crear Nuevo diseno SILICIO', 'Creaci&oacute;n de dise&ntilde;o para trabajar sobre &eacute;l');
adicionar('html/manejo/abrir_diseno.htm', 'Abrir un dise&ntilde;o', 'Abrir diseno SILICIO', 'Abrir un dise&ntilde;o previamente guardado');
adicionar('html/manejo/renombrar_diseno.htm', 'Renombrar un dise&ntilde;o', 'Renombrar diseno SILICIO', 'Renombrar un dise&ntilde;o previamente guardado');
adicionar('html/manejo/eliminar_diseno.htm', 'Eliminar un dise&ntilde;o', 'Eliminar diseno SILICIO', 'Eliminar un dise&ntilde;o previamente guardado');
adicionar('html/acerca_de.htm', 'Acerca de esta gu&iacute;a', 'Caracteristicas tecnicas guia Desarrollo SILICIO', 'Esta gu&iacute;a fue desarrollada en HTML');

//add("<strong><a href='html/acerca_de.htm' target='right'>Acerca De..</a>", "Univalle Universidad Valle documentacion desarrollo aplicacion aplicaci�n", "Informaci�n Aplicacion")
//add("<strong><a href='html/manejo/inicio.htm' target='right'>Inicio documento</a>", "inicio documento crear nuevo", "Cuando se ingresa a la aplicaci�n, esta le pide al usuario crear un documento.")
//add("<strong><a href='html/manejo/estereotipos.htm' target='right'>Panel de Estereotipos</a>", "panel estereotipos estereotipo modelo navegaci�n navegacion imagen imagenes texto conector conectores", "El panel de estereotipos consta de tres partes. Los Graficos - Modelos de Navegaci�n, Imagenes, Texto y conectores.")
////add("<strong><a href='html/manejo/explicacion_conexiones.htm' target='right'>Conexiones entre Estereotipos</a>","conexiones estereotipos punto conexion estereotipo","Para crear una conexi�n de un estereotipo a otro, los c�rculos que se encuentran al lado de los estereotipos...")
////add("<strong><a href='html/manejo/explicacion_vistas.htm' target='right'>Tipos de Vistas</a>","vistas arquitectura arquitecturas Vista Conceptual Logica L�gica Dise�o F�sica","Tipos de Vistas: Vista Conceptual,Vista L�gica o de Dise�o,	Vista F�sica")
//add("<strong><a href='html/conocimientos/_index.htm' target='right'>Conocimientos esenciales</a>", "conocimientos esenciales basicos b�sicos basico b�sico iniciar sistema sesi�n sesion finalizar", "Para el manejo eficaz de GW UML, es necesario tener en cuenta una serie de conocimientos b�sicos o esenciales")
//add("<strong><a href='html/conocimientos/_intro.htm' target='right'>Introducci�n</a>", "introduci�n introducion GW UML GWUML", "Introducci�n a GW UML")
//add("<strong><a href='html/conocimientos/ayuda.htm' target='right'>Uso de la ayuda</a>", "ayuda help manual", "Este modulo permite conocer el uso de este manual")
//add("<strong><a href='html/conocimientos/fin_sesion.htm' target='right'>Finalizar sesi�n</a>", "finalizar sesi�n sesion cerrar terminar", "Cuando se ha dejado de operar el sistema por m�s de 15 minutos, la sesi�n se termina.")
//add("<strong><a href='html/conocimientos/iniciar.htm' target='right'>Iniciar GW UML</a>", "iniciar GW UML GWUML sistema", "Procedimiento para iniciar el GW UML")
//add("<strong><a href='html/conocimientos/pant_ppal.htm' target='right'>Pantalla principal</a>", "Pantalla principal GW UML GWUML", "La pantalla principal de GW UML, posee varios elementos b�sicos que facilitan las tareas del usuario dentro del sistema de informaci�n")
//add("<strong><a href='html/splash.htm' target='right'>Inicio del aplicativo</a>", "GW UML GWUML", "Graficador Web UML")

/* end database records */
