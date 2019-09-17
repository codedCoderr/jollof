<?php
namespace jollofapi\login;

use jollofapi\User;

// required headers for Api Call
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

/**
 * Autoloader
 */
spl_autoload_register(function ($class) {
    $root = dirname(__DIR__);   // get the parent directory
    $file = $root . '/' . str_replace('\\', '/', $class) . '.php';
    if (is_readable($file)) {
        require $root . '/' . str_replace('\\', '/', $class) . '.php';
    }
});

/**
 * Login code
 */
$user = new User();
$result = $user->openConnection();
if($result)
{
    if( isset($_POST['email']) && isset($_POST['password'] )){
        $email      = $_POST['email'];
        $password   = $_POST['password'];
        
        $response = $user->login($email,$password);
        
        echo $response;
    }
    
}
return "failed to login";

