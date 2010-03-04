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
        $componentsXml = $request->getParameter('components_xml');
        $connectionsXml = $request->getParameter('connections_xml');
        $schemafileName = 'design.xsd';
        $xmlHeaders = XMLEngine::generateHeaders('design',$schemafileName);
        $xmlDesignCode = $xmlDesignCode.$xmlHeaders;
        $xmlDesignCode = $xmlDesignCode.$componentsXml.$connectionsXml;
        $xmlDesignCode = $xmlDesignCode.'</design>';
        $wellFormed = XMLEngine::isWellFormed($xmlDesignCode);
        if($wellFormed===true) {
          $isValidXML = XMLEngine::isValid($xmlDesignCode,'../data/'.$schemafileName);
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

  public function executeListDesigns() {
    $user = $this->getUser();
    $designOwner = $user->getAttribute('username');

    $conditions = new Criteria();
    $conditions->add(DesignPeer::OWNER, $designOwner);

    $designs = DesignPeer::doSelect($conditions);

    $responseArray = array();
    $responseArray['success'] = true;

    $designsArray = array();
    foreach($designs as $design) {
      $designArray = array();
      $designArray['name'] = $design->getName();
      $designArray['created_at'] = $design->getCreatedAt();
      $designArray['updated_at'] = $design->getUpdatedAt();
      $designsArray[] = $designArray;
    }

    $responseArray['designs'] = $designsArray;

    return $this->renderText(json_encode($responseArray));
  }
  public function executeDeleteDesign(sfWebRequest $request) {
    if($request->isMethod('post')) {
      $designName = $request->getParameter('design_name');
      $user = $this->getUser();
      $designOwner = $user->getAttribute('username');
      	
      $condition = new Criteria();
      $condition->add(DesignPeer::NAME,$designName);
      $condition->add(DesignPeer::OWNER,$designOwner);
      	
      $design = DesignPeer::doSelectOne($condition);
      	
      if($design!=null) {
        $design->delete();
        return $this->renderText('Ok');
      }
      	
      return $this->renderText('El diseño especificado no existe');
    }
    else {
      return sfView::NONE;
    }
  }
}
