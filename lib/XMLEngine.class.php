<?php

class XMLEngine {
  public static function isWellFormed($xmlCode) {
    $xmlParser = xml_parser_create('UTF-8');
    $success = xml_parse($xmlParser,$xmlCode);
    if($success==1) {
      return true;
    }
    else {
      return xml_error_string(xml_get_error_code($xmlParser));
    }
  }
  public static function isValid($xmlCode, $schemafileName) {
    $xmlDocument = new DOMDocument();
    $xmlDocument->loadXML($xmlCode);
//    $temporaryFile = '../temp/'.time().'-'.rand().'.xml';
//    $xmlDocument->save($temporaryFile);
//    $temporaryXmlDocument = new DOMDocument();
//    $temporaryXmlDocument->load($temporaryFile);
//    unlink($temporaryFile);
    libxml_use_internal_errors(true);
//    $isValid = $temporaryXmlDocument->schemaValidate($schemafileName);
    $isValid = $xmlDocument->schemaValidate($schemafileName);
    if(!$isValid) {
      $errors = libxml_get_errors();
      return $errors[0]->message;  
    }
    return $isValid;
  }
}