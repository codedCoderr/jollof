<?php 

namespace php_serve;

interface AuthInterface {
    public function signup($email, $password);
    public function login($email, $password);
   /*  public function reg($username);
    public function getUsers(); */
}