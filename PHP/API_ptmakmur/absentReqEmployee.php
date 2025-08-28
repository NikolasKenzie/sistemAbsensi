<?php 
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("function/db.php");

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);
// UBAH DIKIT RUSAK BRO
// gua dapet ide pas lagi berak jir
if ($data) {
    $name = $data["name"]; //butuh ga butuh ini sebenarnya cuman gpp lah dah terlanjur
    $email = $data["email"];
    $absentStatus = $data["absentStatus"];
    $reason = $data["reason"];
    $date = $data["date"];


    // getID from employees
    $queryEmployees = "SELECT * FROM employees WHERE email = '$email'";
    $result = queryDb($queryEmployees);
    $idEmp = $result[0]["id"];

    
    //insert to atttendance
    $insertAttendance = "
        INSERT INTO attendance (employee_id, date, status, reason)
        VALUES ('$idEmp', '$date', '$absentStatus', '$reason')
    ";
    if (mysqli_query($conn, $insertAttendance)) {
        echo json_encode([
            "success" => true,
            "message" => "Data berhasil dikirim"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message"=> "Gagal insert: "
        ]);
    }
}
?>