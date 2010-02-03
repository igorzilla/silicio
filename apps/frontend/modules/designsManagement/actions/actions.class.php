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
      $user = $this->getUser();
      $isAuthenticated = $user->isAuthenticated();
      if($isAuthenticated) {
        $xmlDesignCode = $request->getParameter('xml_design_code');
        $wellFormed = XMLEngine::isWellFormed($xmlDesignCode);
        if($wellFormed===true) {
          $isValidXML = XMLEngine::isValid($xmlDesignCode,'../data/design.xsd');
          if($isValidXML===true) {
            $designName = $request->getParameter('design_name');
            $designOwner = $user->getAttribute('username');
            $design = new Design();
            $design->setName($designName);
            $design->setOwner($designOwner);
            $design->setXmlCode($xmlDesignCode);
            $design->save();
            return $this->renderText('Ok');
          }
          else {
            return $this->renderText($isValidXML);
          }
        }
        else {
          return $this->renderText($wellFormed);
        }
      }
      else {
        return $this->renderText('Usuario no autenticado');
      }
    }
    else {
      return sfView::NONE;
    }
  }
}
