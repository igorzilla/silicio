<?php

include(dirname(__FILE__).'/../../bootstrap/functional.php');

chdir(dirname(__FILE__).'/../../../web');

new sfDatabaseManager($configuration);
$loader = new sfPropelData();

$browser = new sfTestFunctional(new sfBrowser());

$browser->get('/authentication/generateCaptcha');
$browser->post('/authentication/createAccount', array('user' => array('first_name' => 'Usuario', 'last_name' => 'De prueba', 'email' => 'usuarioprueba@gmail.com', 'email_repetition' => 'usuarioprueba@gmail.com', 'username' => 'usuario', 'password' => 'passwordprueba', 'password_repetition' => 'passwordprueba', 'typed_captcha' => '--------')));
$response = $browser->getResponse()->getContent();
$browser->test()->like($response, '/false/', 'Protección CAPTCHA');

$testUser = new User();
$testUser->setFirstName('Usuario');
$testUser->setLastName('De prueba');
$testUser->setEmail('usuarioprueba@gmail.com');
$testUser->setUsername('usuario');
$testUser->setPassword(sha1('passwordprueba'));
$testUser->save();

$browser->post('/authentication/login', array('user' => array('username' => 'usuario', 'password' => 'passwordprueba')));
$browser->get('/');
$response = $browser->getResponse()->getContent();
$browser->test()->like($response, '/new\sMainController()/', 'Autenticación');

$browser->get('/authentication/logout');
$browser->get('/');
$response = $browser->getResponse()->getContent();
$browser->test()->like($response, '/new\sAuthenticationController()/', 'Cierre de sesión de usuario');

$testUser->delete();
