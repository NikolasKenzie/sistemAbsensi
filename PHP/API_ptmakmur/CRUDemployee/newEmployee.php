<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../function/db.php");

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);


if ($data) {
    $name = $data['name'];
    $gender = $data['gender'];
    $email = $data['email'];
    $password = $data['password'];
    $birthDate = $data['birthDate'];
    $phoneNumber = $data['phoneNumber'];
    $idCard = $data['idCard'];
    $jobPosition = $data['jobPosition'];
    $role = $data['role'] ?? 'employee';
    $departmentId = $data['departmentId'];
    $salary = $data['salary'];


    //insert employee table 
    $queryNewEmployee = "
        INSERT INTO employees (id_card, name, gender, birth_date, email, phone_number, job_position, departement_id, salary)
        VALUES ('$idCard', '$name', '$gender', '$birthDate', '$email', '$phoneNumber', '$jobPosition', '$departmentId', '$salary')
    ";
    $resultNewEmployee = mysqli_query($conn, $queryNewEmployee);


    //insert login_system table
    if ($resultNewEmployee) {
        $employeeId = mysqli_insert_id($conn);
        $queryLogin = "
            INSERT INTO login_system (id, email, password, name, role)
            VALUES ('$employeeId', '$email', '$password', '$name', '$role')
        ";
        $resultLogin = mysqli_query($conn, $queryLogin);

        if ($resultLogin) {
            echo json_encode([
                "status" => true,
                "message" => "Employee and login created successfully"
            ]);
        } else {
            echo json_encode([
                "status" => false,
                "error" => mysqli_error($conn),
                "query" => $queryLogin
            ]);
        }

    } else {
        echo json_encode([
            "status" => false,
            "error" => mysqli_error($conn),
            "query" => $queryNewEmployee
        ]);
    }


}

?>