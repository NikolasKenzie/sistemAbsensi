<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

include("function/db.php");

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

function checkingVerify($email, $password)
{
    // global $conn;
    $queryCheck = "SELECT * FROM login_system WHERE email = '$email' AND password = '$password'";
    $res = queryDb($queryCheck);
    
    echo json_encode([
        "status" => count($res) > 0,
    ]);

}

if ($data) {
    // $emailAdmin = trim( $data["emailAdmin"]);
    // $passwordAdmin = trim($data["password"]);
    $emailAdmin = str_replace('"', '', $data["emailAdmin"]);
    $passwordAdmin = str_replace("\"", "", $data["password"]);

    checkingVerify($emailAdmin, $passwordAdmin);

}

?>