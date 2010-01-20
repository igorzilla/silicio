<?php

/**
 * designsManagement actions.
 *
 * @package    silicio
 * @subpackage designsManagement
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 12479 2008-10-31 10:54:40Z fabien $
 */
class designsManagementActions extends sfActions
{
  /**
   * Executes index action
   *
   * @param sfRequest $request A request object
   */
  public function executeSaveDesign(sfWebRequest $request)
  {
    if($request->isMethod('post')) {
      $xmlDesignCode = $request->getParameter('xml_design_code');
      $wellFormed = XMLEngine::isWellFormed($xmlDesignCode);
      if($wellFormed===true) {
        return $this->renderText('Ok');
      }
      else {
        return $this->renderText($wellFormed);
      }
    }
    else {
      return sfView::NONE;
    }
  }
}
