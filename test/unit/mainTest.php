<?php 

require_once(dirname(__FILE__).'/../../apps/frontend/modules/main/actions/actions.class.php');
require_once(dirname(__FILE__).'/../../config/ProjectConfiguration.class.php');
require_once(dirname(__FILE__).'/../../lib/vendor/lime/lime.php');

$configuration = ProjectConfiguration::getApplicationConfiguration('frontend', 'dev', true);
$context = sfContext::createInstance($configuration);
$mainActionsObject = new mainActions($context,'main','');
$webRequest = new sfWebRequest($context->getEventDispatcher(), null, null, null);

$limeTestObject = new lime_test(1, new lime_output_color());

$limeTestObject->diag('Módulo Principal');

$mainActionsObject->executeIndex($webRequest);

$limeTestObject->ok(TRUE,'Pasó la prueba');

?>