<?php

class sfValidatorCaptcha extends sfValidatorBase {
  protected function configure($options = array(), $messages = array()) {
    $this->addMessage('no_match', 'El código de verificación es incorrecto');
    $this->addMessage('required', 'Debe escribir el código de verificación');

    $this->addOption('captcha');
    $this->addOption('length');
  }

  protected function doClean($value) {
    $clean = (string) $value;

    $length = strlen($clean);

    if($this->hasOption('length') && $length != $this->getOption('length')) {
      throw new sfValidatorError($this, 'no_match', array('value' => $value));
    }

    if($this->hasOption('captcha') && $clean != $this->getOption('captcha')) {
      throw new sfValidatorError($this, 'no_match', array('value' => $value));
    }

    return $clean;
  }
}

?>