<?php

/**
 * principal actions.
 *
 * @package    silicio
 * @subpackage principal
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 12479 2008-10-31 10:54:40Z fabien $
 */
class mainActions extends sfActions
{
  /**
   * Executes index action
   *
   * @param sfRequest $request A request object
   */
  public function executeIndex(sfWebRequest $request)
  {

  }
  public function executeIndexAjax($request) {
    $this->renderPartial('main');
    return sfView::NONE;
  }
}
