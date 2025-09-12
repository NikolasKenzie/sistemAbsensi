<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);
include('../function/db.php');
ini_set('display_errors', 0);
error_reporting(0);


if ($data) {
    $id = $data['id'];
    $idCard = $data['id_card'];
    $name = $data['name'];
    $gender = $data['gender'];
    $birthDate = $data['birth_date'];
    $email = $data['email'];
    $phoneNumber = $data['phone_number'];
    $jobPosition = $data['job_position'];
    $departmentId = $data['departement_id'];
    $salary = $data['salary'];

    //update table
    $queryUpdate = "
        UPDATE employees
        SET id_card = '$idCard', name = '$name', gender = '$gender', 
        birth_date = '$birthDate', email = '$email', phone_number = '$phoneNumber',
        job_position = '$jobPosition', departement_id = '$departmentId', salary = '$salary'
        WHERE id = $id
    ";

    $result = mysqli_query($conn, $queryUpdate);


    if ($result) {
        $rows = mysqli_affected_rows($conn);
        echo json_encode([
            "status" => $rows > 0,
            "message" => $rows > 0 ? "Data berhasil diupdate" : "Tidak ada data yang diubah"
        ]);
    } else {
        echo json_encode([
            "status" => false,
            "message" => "Query gagal: " . mysqli_error($conn)
        ]);
    }

}
?>