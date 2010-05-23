<?php

/**
 * authentication actions.
 *
 * @package    silicio
 * @subpackage authentication
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 12479 2008-10-31 10:54:40Z fabien $
 */
class authenticationActions extends sfActions
{
  /**
   * Executes index action
   *
   * @param sfRequest $request A request object
   */
  public function executeIndex(sfWebRequest $request)
  {
    if($this->getUser()->isAuthenticated()) {
      $this->redirect('main/index');
    }
  }
  public function executeIndexAjax(sfWebRequest $request) {
    $this->renderPartial('indexBody');
    return sfView::NONE;
  }
  public function executeLogin(sfWebRequest $request) {
    $isPost = $request->isMethod('post');
    if($isPost) {
      $form = new AuthenticationForm();
      $userData = $request->getParameter('user');
      $form->bind($userData);
      $result = array();
      $isValid = $form->isValid();
      if($isValid) {
        $user = $this->getUser();
        $isAuthenticated = $user->isAuthenticated();
        if($isAuthenticated) {
          return sfView::NONE;
        }
        else {
          $coincide = UserPeer::coincide($userData['username'],$userData['password']);
          if($coincide){
            $user->setAuthenticated(true);
            $user->setAttribute('username',$userData['username']);
            $result['success'] = true;
          }
          else {
            $result['success'] = false;
            $result['message'] = 'El usuario y contraseña no coinciden';
          }
        }
      }
      else {
        $result['success'] = false;
        foreach ($form as $field) {
          if($field->hasError()) {
            $result['message'] = $field->getError()->__toString();
            break;
          }
        }
      }
      return $this->renderText(json_encode($result));
    }
    else {
      return sfView::NONE;
    }
  }

  public function executeLogout(sfWebRequest $request) {
    $user = $this->getUser();
    if($user->isAuthenticated()) {
      $user->setAuthenticated(false);
      $user->setAttribute('username', null);
    }
    return sfView::NONE;
  }

  public function executeGenerateCaptcha() {
    $response = $this->getResponse();
    $response->setContentType("image/gif");
    $response->send();

    $alphabet = "1234567890abcdefghijklmnopqrstuvwxyz";
    $key = "";
    $captcha_length = 8;
    for($i=0;$i<$captcha_length;$i++) {
      $key .= $alphabet{rand(0,strlen($alphabet)-1)};
    }

    $this->getUser()->setAttribute('captcha',$key);

    $captcha = imagecreatefromgif("images/bgcaptcha.gif");
    $colText = imagecolorallocate($captcha, 0, 0, 0);
    imagestring($captcha, 5, 16, 7, $key, $colText);
    imagegif($captcha);
    return sfView::NONE;
  }

  public function executeCreateAccount(sfWebRequest $request) {
    $isPost = $request->isMethod('post');
    if($isPost) {
      $form = new CreateAccountForm();
      $captchaValidator = new sfValidatorCaptcha(array());
      $captcha = $this->getUser()->getAttribute('captcha');
      $captchaValidator->addOption('captcha', $captcha);
      $captchaValidator->addOption('length', 8);
      $form->setValidator('typed_captcha', $captchaValidator);
      $userData = $request->getParameter('user');
      $form->bind($userData);
      $result = array();
      $isValid = $form->isValid();
      if($isValid) {
        $user = new User();
        $user->fillData($userData);
        $user->save();

        $dirPath = dirname(__FILE__).'/../../../../../web/examples/';
        for($i = 1;$i <= 5;$i++) {
          $filePath = $dirPath.'components_example'.$i.'.xml';
          $handler = fopen($filePath,'r');
          $exampleComponentsCode = '';
          if($handler !== FALSE) {
            $exampleComponentsCode = fread($handler, filesize($filePath));
            fclose($handler);
          }
          $filePath = $dirPath.'connections_example'.$i.'.xml';
          $handler = fopen($filePath,'r');
          $exampleConnectionsCode = '';
          if($handler !== FALSE) {
            $exampleConnectionsCode = fread($handler, filesize($filePath));
            fclose($handler);
          }
          $design = new Design();
          $design->setName('Ejemplo '.$i);
          $design->setOwner($userData['username']);
          $design->setComponentsXml($exampleComponentsCode);
          $design->setConnectionsXml($exampleConnectionsCode);
          $design->save();
        }

        $result['success'] = true;
      }
      else {
        $result['success'] = false;
        foreach ($form as $field) {
          if($field->hasError()) {
            $result['message'] = $field->getError()->__toString();
            break;
          }
        }
      }
      return $this->renderText(json_encode($result));
    }
  }
}
