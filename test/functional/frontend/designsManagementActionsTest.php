<?php

include(dirname(__FILE__).'/../../bootstrap/functional.php');

chdir(dirname(__FILE__).'/../../../lib');

new sfDatabaseManager($configuration);
$loader = new sfPropelData();

$browser = new sfTestFunctional(new sfBrowser());

$testUser = new User();
$testUser->setFirstName('Usuario');
$testUser->setLastName('De prueba');
$testUser->setEmail('usuarioprueba@gmail.com');
$testUser->setUsername('usuario');
$testUser->setPassword(sha1('passwordprueba'));
$testUser->save();

$browser->post('/authentication/login', array('user' => array('username' => 'usuario', 'password' => 'passwordprueba')));
$browser->get('/');

$browser->post('/designsManagement/saveDesign', array('components_xml' => '<components></components>', 'connections_xml' => '<connections></connections>', 'design_name' => 'Prueba'));
$criteria = new Criteria();
$criteria->add(DesignPeer::OWNER, 'usuario');
$criteria->add(DesignPeer::NAME, 'Prueba');
$numberOfDesigns = DesignPeer::doCount($criteria);
$browser->test()->is($numberOfDesigns, 1, 'Almacenamiento de diseños');

$browser->post('/designsManagement/renameDesign', array('old_design_name' => 'Prueba', 'new_design_name' => 'PruebaModificada'));
$criteria = new Criteria();
$criteria->add(DesignPeer::OWNER, 'usuario');
$criteria->add(DesignPeer::NAME, 'PruebaModificada');
$numberOfDesigns = DesignPeer::doCount($criteria);
$browser->test()->is($numberOfDesigns, 1, 'Renombramiento de diseños');

$browser->post('/designsManagement/updateDesign', array('components_xml' => '<components><component><class>AndGate</class><id>zyODhcsTVX</id><xCoordinate>68</xCoordinate><yCoordinate>71</yCoordinate></component><component><class>AndGate</class><id>k7kwufJSyO</id><xCoordinate>117</xCoordinate><yCoordinate>157</yCoordinate></component></components>', 'connections_xml' => '<connections><connection><sourceId>zyODhcsTVX</sourceId><sourcePortIndex>0</sourcePortIndex><targetId>k7kwufJSyO</targetId><targetPortIndex>0</targetPortIndex></connection></connections>', 'design_name' => 'PruebaModificada'));
$design = DesignPeer::retrieveByPK('PruebaModificada','usuario');
$components = $design->getComponentsXml();
$connections = $design->getConnectionsXml();
$browser->test()->is($components.$connections,'<components><component><class>AndGate</class><id>zyODhcsTVX</id><xCoordinate>68</xCoordinate><yCoordinate>71</yCoordinate></component><component><class>AndGate</class><id>k7kwufJSyO</id><xCoordinate>117</xCoordinate><yCoordinate>157</yCoordinate></component></components><connections><connection><sourceId>zyODhcsTVX</sourceId><sourcePortIndex>0</sourcePortIndex><targetId>k7kwufJSyO</targetId><targetPortIndex>0</targetPortIndex></connection></connections>','Actualización de un diseño');

$browser->post('/designsManagement/getComponentsXML', array('design_name' => 'PruebaModificada'));
$components = $browser->getResponse()->getContent();
$browser->post('/designsManagement/getConnectionsXML', array('design_name' => 'PruebaModificada'));
$connections = $browser->getResponse()->getContent();
$browser->test()->is($components.$connections,'<components><component><class>AndGate</class><id>zyODhcsTVX</id><xCoordinate>68</xCoordinate><yCoordinate>71</yCoordinate></component><component><class>AndGate</class><id>k7kwufJSyO</id><xCoordinate>117</xCoordinate><yCoordinate>157</yCoordinate></component></components><connections><connection><sourceId>zyODhcsTVX</sourceId><sourcePortIndex>0</sourcePortIndex><targetId>k7kwufJSyO</targetId><targetPortIndex>0</targetPortIndex></connection></connections>','Consulta de un diseño');

$browser->post('/designsManagement/saveDesign', array('components_xml' => '<components></components>', 'connections_xml' => '<connections></connections>', 'design_name' => 'Prueba2'));
$browser->get('/designsManagement/listDesigns');
$response = $browser->getResponse()->getContent();
$array = json_decode($response, true);
$design1Name = $array['designs'][0]['name'];
$design2Name = $array['designs'][1]['name'];
$browser->test()->is($design1Name.$design2Name, 'PruebaModificadaPrueba2', 'Generación de lista de diseños');

$browser->post('/designsManagement/deleteDesign', array('design_name' => 'PruebaModificada'));
$browser->post('/designsManagement/deleteDesign', array('design_name' => 'Prueba2'));
$criteria = new Criteria();
$criteria->add(DesignPeer::OWNER, 'usuario');
$numberOfDesigns = DesignPeer::doCount($criteria);
$browser->test()->is($numberOfDesigns, 0, 'Eliminación de diseños');

$testUser->delete();
