<?php
class AuthenticationForm extends sfForm {
	public function configure() {
	  $this->setWidgets(array(
	  'username' => new sfWidgetFormInput(array(), array()),
	  'password' => new sfWidgetFormInput(array(), array())
	  ));
	  
	  $usernameValidator = new sfValidatorString(array('min_length' => 6, 'max_length' => 30));
	  $usernameValidator->addMessage('required', 'Debe digitar su nombre de usuario');
    $usernameValidator->addMessage('min_length', 'El nombre de usuario debe tener mínimo %min_length% caracteres');
    $usernameValidator->addMessage('max_length', 'El nombre de usuario debe tener máximo %max_length% caracteres');
	  $this->setValidator('username', $usernameValidator);
	  
	  $passwordValidator = new sfValidatorString(array('min_length' => 8, 'max_length' => 30));
	  $passwordValidator->addMessage('required', 'Debe digitar su contraseña');
    $passwordValidator->addMessage('min_length', 'La contraseña debe tener mínimo %min_length% caracteres');
    $passwordValidator->addMessage('max_length', 'La contraseña debe tener máximo %max_length% caracteres');
	  $this->setValidator('password', $passwordValidator);
	}
}
?>