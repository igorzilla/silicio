<?php

include(dirname(__FILE__).'/../../bootstrap/functional.php');

new sfDatabaseManager($configuration);
$loader = new sfPropelData();

$browser = new sfTestFunctional(new sfBrowser());


