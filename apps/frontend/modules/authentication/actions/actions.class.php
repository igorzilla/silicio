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

  }
  public function executeLogin(sfWebRequest $request) {
    if($request->isMethod('post')) {
      $form = new AuthenticationForm();
      $user = $request->getParameter('user');
      $form->bind($user);
      $result = array();
      if($form->isValid()) {
        $result['success'] = true;
        $result['message'] = 'Los datos son válidos';
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
}
