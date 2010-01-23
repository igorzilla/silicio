<?php
class AuthenticationForm extends sfForm {
	public function configure() {
	  $this->setWidgets(array(
	  'username' => new sfWidgetFormInput(array(), array()),
	  'password' => new sfWidgetFormInput(array(), array())
	  ));
	  
	  $usernameValidator = new sfValidatorString(array('max_length' => 10));
	  $this->setValidator('username', $usernameValidator);
	  
	  $passwordValidator = new sfValidatorString(array('max_length' => 10));
	  $this->setValidator('password', $usernameValidator);
	}
}
?>