<?php

class UserPeer extends BaseUserPeer
{
  static public function coincide($username, $password) {
  	$conditions = new Criteria();
  	$conditions->add(UserPeer::USERNAME, $username);
  	$conditions->add(UserPeer::PASSWORD, sha1($password));
  	
  	$numberOfUsers = UserPeer::doCount($conditions);
  	
  	return ($numberOfUsers==1);
  }
}
