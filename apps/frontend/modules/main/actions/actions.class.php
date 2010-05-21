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
    $this->renderPartial('indexBody');
    return sfView::NONE;
  }
  
  public function executeHomePage() {
  	$this->renderPartial('homePage');
  	return sfView::NONE;
  }
  
  public function executeAboutPage() {
    $this->renderPartial('aboutPage');
    return sfView::NONE;
  }

  //  public function executeGetJavascriptClass(sfWebRequest $request) {
  //    $isGet = $request->isMethod('get');
  //    if($isGet) {
  //      $className = $request->getParameter('className');
  //      $filePath = dirname(__FILE__).'/../../../../../web/js/'.$className.'.js';
  //      $handler = fopen($filePath,'r');
  //      if($handler !== FALSE) {
  //        $classCode = fread($handler, filesize($filePath));
  //        fclose($handler);
  //        return $this->renderText($classCode);
  //      }
  //    }
  //    return sfView::NONE;
  //  }
}
