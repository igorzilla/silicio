<?php

class XMLEngine {
  public static function generateHeaders($rootElementTag, $schemafileName) {
    $xmlHeaders = '<?xml version="1.0" encoding="UTF-8"?>';
    $xmlHeaders = $xmlHeaders.'<'.$rootElementTag.' ';
    $xmlHeaders = $xmlHeaders.'xmlns="http://www.w3schools.com" ';
    $xmlHeaders = $xmlHeaders.'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ';
    $xmlHeaders = $xmlHeaders.'xsi:schemaLocation="http://www.w3schools.com '.$schemafileName.'"';
    $xmlHeaders = $xmlHeaders.'>';
    return $xmlHeaders;
  }
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