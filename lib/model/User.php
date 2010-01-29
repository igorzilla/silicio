<?php

class User extends BaseUser
{
  public function fillData($userData) {
  	$this->setUsername($userData['username']);
  	$this->setPassword(sha1($userData['password']));
  	$this->setFirstName($userData['first_name']);
  	$this->setLastName($userData['last_name']);
  	$this->setEmail($userData['email']);
  }
}
