<?php 

namespace jollofapi;

interface AuthInterface {
    public function signup($email, $password);
    public function login($email, $password);
}