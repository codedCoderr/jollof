<?php
namespace jollofapi;

use PDO;
use Exception;
use jollofapi\Auth;
use jollofapi\AuthInterface;



class User extends Auth implements AuthInterface {

    public function login($input_email,$input_password) {
        $newEmail       = trim($input_email);
        $newPassword    = trim($input_password);
        $data = array();
        $data["body"] = array();
 
     
        try
        {
            $db     = static::getDB();
            $stmt   = $db->prepare('SELECT * FROM users WHERE (email = :newEmail or username=:newEmail) ');
                    $stmt->bindParam(":newEmail", $newEmail,PDO::PARAM_STR) ;
                    $stmt->bindParam(":newPassword", $newPassword,PDO::PARAM_STR) ;
            $logged = $stmt->execute();
            
                while ($user = $stmt->fetch(PDO::FETCH_ASSOC)){

                    extract($user);
            
                    $p  = array(
                          "id" => $id,
                          "email" => $email,
                          "user_password" => $user_password,
                        );
                    array_push($data["body"], $p);
                }
                if($logged && password_verify($newPassword, $p['user_password'])){
                    echo json_encode($data);
                }else{
                    throw new Exception('Username or Password incorrect!',500);
                }
        }
        catch(PDOException $e)
        {
            echo $e->getMessage();
        }
    }
   


    public function signup($email,$password) {
        $newPassword = password_hash($password, PASSWORD_DEFAULT);
     
        try
        {
            $db = static::getDB();
            $sql= "SELECT * FROM Users WHERE username = :email or email=:email LIMIT 1";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $check = $stmt->execute();
            $stmt->fetchAll(PDO::FETCH_OBJ);
            
            
            if ( !$stmt->rowCount() > 0 ) {
                $stmt = $db->prepare('INSERT INTO users (email, user_password) VALUES (:email, :newPassword)');
                $stmt->bindParam(':email', $email, PDO::PARAM_STR);
                $stmt->bindParam(':newPassword', $newPassword, PDO::PARAM_STR);
                $results = $stmt->execute();
                return json_encode($results);
            }
            else{
                throw new Exception('User already exist, try a different email and username',500);
            }
        }
        catch(PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    
    

}

