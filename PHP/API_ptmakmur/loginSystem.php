<?php 
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("function/db.php");

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if ($data) {
    $id = $data["id"];
    $password = $data["password"];

    $reqId = "SELECT * FROM login_system  WHERE email ='$id'";
    $queryId = queryDb($reqId);

    if (empty($queryId)) {
        echo json_encode([
        "status" => "failed",
        "message" => "id is not found",
        
    ]);
    } else {
        $reqPassword = "SELECT * FROM login_system WHERE email = '$id' AND password = '$password'";
        $queryPassword = queryDb($reqPassword);
        $row = $queryPassword[0];
        if (!empty($queryPassword)) {
            echo json_encode([
                
                "status" => "success",
                "message" => "email and password are correct",
                "data" => [
                    "name" => $row["name"],
                    "role" => $row["role"],
                ]
            ]);
        } else {
            echo json_encode([
                "status" => "failed",
                "message" => "Password is incorrect"
            ]);
        }
    }
}
// $reqId = "SELECT * FROM admin_dashboard  WHERE id = '3216677'";
// $queryId = queryDb($reqId);
// if (empty($queryId)) {
//     echo "Data tidak ditemukan";
// } else {
//     echo "Data ditemukan";
//     echo json_encode($queryId);
// }

?>