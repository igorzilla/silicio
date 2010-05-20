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
	private $schemafileName = 'design.xsd';
	/**
	 * Executes index action
	 *
	 * @param sfRequest $request A request object
	 */
	public function executeSaveDesign(sfWebRequest $request)
	{
		if($request->isMethod('post')) {
			$user = $this->getUser();
			$componentsXml = $request->getParameter('components_xml');
			$connectionsXml = $request->getParameter('connections_xml');
			$xmlDesignCode = $this->joinXML($componentsXml, $connectionsXml);
			$isAcceptable = $this->isAcceptableXML($xmlDesignCode);
			if($isAcceptable===true) {
				$designName = $request->getParameter('design_name');
				$designOwner = $user->getAttribute('username');
				$design = new Design();
				$design->setName($designName);
				$design->setOwner($designOwner);
				$design->setComponentsXml($componentsXml);
				$design->setConnectionsXml($connectionsXml);
				$design->save();
				return $this->renderText('Ok');
			}
			else {
				return $this->renderText($isAcceptable);
			}
		}
		else {
			return sfView::NONE;
		}
	}

	private function joinXML($componentsXml, $connectionsXml) {
		$xmlHeaders = XMLEngine::generateHeaders('design',$this->schemafileName);
		$xmlDesignCode = '';
		$xmlDesignCode = $xmlDesignCode.$xmlHeaders;
		$xmlDesignCode = $xmlDesignCode.$componentsXml.$connectionsXml;
		$xmlDesignCode = $xmlDesignCode.'</design>';
		return $xmlDesignCode;
	}

	private function isAcceptableXML($xmlDesignCode) {
		$wellFormed = XMLEngine::isWellFormed($xmlDesignCode);
		if($wellFormed===true) {
			$isValidXML = XMLEngine::isValid($xmlDesignCode,'../data/'.$this->schemafileName);
			if($isValidXML===true) {
				return true;
			}
			else {
				return $isValidXML;
			}
		}
		else {
			return $wellFormed;
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

	public function executeUpdateDesign(sfWebRequest $request) {
		if($request->isMethod('post')) {
			$designName = $request->getParameter('design_name');
			$user = $this->getUser();
			$designOwner = $user->getAttribute('username');

			$design = DesignPeer::retrieveByPK($designName, $designOwner);

			if($design!=null) {
				$componentsXml = $request->getParameter('components_xml');
				$connectionsXml = $request->getParameter('connections_xml');
				$xmlDesignCode = $this->joinXML($componentsXml, $connectionsXml);
				$isAcceptable = $this->isAcceptableXML($xmlDesignCode);
				if($isAcceptable===true) {
					$design->setComponentsXml($componentsXml);
					$design->setConnectionsXml($connectionsXml);
					$design->save();
					return $this->renderText('Ok');
				}
				else {
					return $this->renderText($isAcceptable);
				}
			}
			else {
				return $this->renderText('El diseño especificado no existe');
			}
		}
		else {
			return sfView::NONE;
		}
	}

	public function executeDeleteDesign(sfWebRequest $request) {
		if($request->isMethod('post')) {
			$designName = $request->getParameter('design_name');
			$user = $this->getUser();
			$designOwner = $user->getAttribute('username');

			$design = DesignPeer::retrieveByPK($designName, $designOwner);

			if($design!=null) {
				$design->delete();
				return $this->renderText('Ok');
			}
			else {
				return $this->renderText('El diseño especificado no existe');
			}
		}
		else {
			return sfView::NONE;
		}
	}

	public function executeGetComponentsXML(sfWebRequest $request) {
		if($request->isMethod('post')) {
			$designName = $request->getParameter('design_name');
			$user = $this->getUser();
			$designOwner = $user->getAttribute('username');

			$design = DesignPeer::retrieveByPK($designName, $designOwner);

			if($design!=null) {
				$response = $this->getResponse();
				$response->setContentType("text/xml");
				$componentsXml = $design->getComponentsXml();
				return $this->renderText($componentsXml);
			}
			else {
				//TODO: This message isn't enough to alert the client-side
				return $this->renderText('El diseño especificado no existe');
			}
		}
		else {
			return sfView::NONE;
		}
	}

	public function executeGetConnectionsXML(sfWebRequest $request) {
		if($request->isMethod('post')) {
			$designName = $request->getParameter('design_name');
			$user = $this->getUser();
			$designOwner = $user->getAttribute('username');

			$design = DesignPeer::retrieveByPK($designName, $designOwner);

			if($design!=null) {
				$response = $this->getResponse();
				$response->setContentType("text/xml");
				$connectionsXml = $design->getConnectionsXml();
				return $this->renderText($connectionsXml);
			}
			else {
				//TODO: This message isn't enough to alert the client-side
				return $this->renderText('El diseño especificado no existe');
			}
		}
		else {
			return sfView::NONE;
		}
	}

	public function executeRenameDesign(sfWebRequest $request) {
		if($request->isMethod('post')) {
			$oldDesignName = $request->getParameter('old_design_name');
			$newDesignName = $request->getParameter('new_design_name');
			$user = $this->getUser();
			$designOwner = $user->getAttribute('username');

			$design = DesignPeer::retrieveByPK($oldDesignName, $designOwner);

			if($design!=null) {
				$design->setName($newDesignName);
				$affectedRows = $design->save();
				return $this->renderText($affectedRows);
				//				return $this->renderText('Ok');
			}
			else {
				//TODO: This message isn't enough to alert the client-side
				return $this->renderText('El diseño especificado no existe');
			}
		}
		else {
			return sfView::NONE;
		}
	}
}
