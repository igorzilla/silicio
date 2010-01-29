<?php 
class CreateAccountForm extends AuthenticationForm {
	public function configure() {
	  parent::configure();
	  
	  $this->setWidget('first_name', new sfWidgetFormInput(array(), array()));
	  $this->setWidget('last_name', new sfWidgetFormInput(array(), array()));
	  $this->setWidget('email', new sfWidgetFormInput(array(), array()));
	  $this->setWidget('typed_captcha', new sfWidgetFormInput(array(), array()));
		
	  $firstNameValidator = new sfValidatorString(array('max_length' => 30));
    $firstNameValidator->addMessage('required', 'Debe digitar su nombre');
    $firstNameValidator->addMessage('max_length', 'El nombre debe tener máximo %max_length% caracteres');
    $this->setValidator('first_name', $firstNameValidator);
    
	  $lastNameValidator = new sfValidatorString(array('max_length' => 30));
    $lastNameValidator->addMessage('required', 'Debe digitar su apellido');
    $lastNameValidator->addMessage('max_length', 'El apellido debe tener máximo %max_length% caracteres');
    $this->setValidator('last_name', $firstNameValidator);
    
	  $emailValidator = new sfValidatorEmail(array('max_length' => 320));
    $emailValidator->addMessage('required', 'Debe digitar su dirección de email');
    $emailValidator->addMessage('max_length', 'La dirección de email debe tener máximo %max_length% caracteres');
    $emailValidator->addMessage('invalid', 'La dirección de email es inválida');
    $this->setValidator('email', $emailValidator);
    
    $this->validatorSchema->setOption('allow_extra_fields', true);
	}
}
?>