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
    return sfView::NONE;
  }
}
