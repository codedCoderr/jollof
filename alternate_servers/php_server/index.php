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
   $data        = file_get_contents(__DIR__ . '/../../auth.json'); 
   $data        = json_decode($data,true);

   foreach($data as $users)
   {
       foreach ($users as $people){
           if( ($people['email'] == $email) && ($people['password'] == $password) ) {
                    $myres = json_encode($people);
                    echo $myres;
            };
        }
   } 
}

