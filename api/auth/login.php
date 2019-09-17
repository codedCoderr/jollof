<?php
// required headers for Api Call
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$response = [];
if( isset($_POST['email']) && isset($_POST['password'] ) )
{
   $email       = $_POST['email'];
   $password    = $_POST['password'];
   $data        = file_get_contents(__DIR__.'/../../auth.json'); 
   $data        = json_decode($data,true);


    foreach($data['users'] as $user)
    {
        $userEmail  = $user['email'];
        $userPass   = $user['password'];
        
        if( ($userEmail === $email && $userPass === $password) ) {
            $response[] = [
                'id'        => $user['id'],
                'name'      => $user['name'],
                'username'  => $user['username'],
                'email'     => $user['email'],
                'avatar'    => $user['avatar'],
                'status'    => $user['status'],
            ];
            
        }
    }

    if(count($response) === 0){
        $message = "Email or Password incorrect, try again!";
        header('HTTP/1.1 401 Unauthorized');
        echo json_encode(['status' => 401,'message' => $message]);
    }else{
        foreach ($response as $value) {
            $data = json_encode($value);
            echo $data;
        }
    }
        
}

