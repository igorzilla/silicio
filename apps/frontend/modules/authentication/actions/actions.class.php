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
    if($this->getUser()->isAuthenticated()) {
      $this->getUser()->setAuthenticated(false);
    }
    return sfView::NONE;
  }
}
