<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("function/db.php");

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

function checkIn($date, $employeeId, $checkTime, $departmentId)
{
    global $conn;

    $queryInsert = "
        INSERT INTO attendance (employee_id, `date`, check_in, status, location, reason)
        VALUES ('$employeeId', '$date', '$checkTime', 'Present', '$departmentId', '-')
    ";

    $resultInsert = mysqli_query($conn, $queryInsert);

    if (!$resultInsert) {
        return ["status" => false, "error" => mysqli_error($conn), "query" => $queryInsert];
    }

    return ["status" => true, "message" => "Check-in success", "query" => $queryInsert];
}

function checkOut($employeeId, $date, $checkTime)
{
    global $conn;

    $queryUpdate = "
        UPDATE attendance SET check_out = '$checkTime', status = 'Leave'
        WHERE date = '$date' AND employee_id = '$employeeId'
    ";
    $resultUpdate = mysqli_query($conn, $queryUpdate);

    if (!$resultUpdate) {
        return ["status" => false, "error" => mysqli_error($conn), "query" => $queryUpdate];
    }
    return ["status" => true, "message" => "Check-out success", "query" => $queryUpdate];

}


if ($data) {
    //data dari method POST
    $idCard = $data["idCard"];
    $date = $data["date"];
    $checkTime = $data["checkTime"];
    $departmentId = $data["departmentId"];

    //query on employeesdb
    $querySearch = "SELECT * FROM employees WHERE id_card = '$idCard'";
    $query = queryDb($querySearch);

    if ($query && count($query) > 0) {
        $result = $query[0];
        $employeeId = $result["id"] ?? 'null';
        $nameEmployee = $result["name"] ?? 'null';
        $departmentId = $result['departement_id'] ?? 'null';


        //cek apakah udah absen masuk apa blm pakek tanggal
        $queryCheckdate = "SELECT * FROM attendance WHERE `date` = '$date' AND employee_id = '$employeeId'";
        //kalau true berarti ada
        $resultQueryCheckdate = queryDb($queryCheckdate);

        if (count($resultQueryCheckdate) > 0) {
            //insert ke checkout
            $action = checkOut($employeeId, $date, $checkTime);

        } else {
            //update attendance buat check_in pakai ID
            $action = checkIn($date, $employeeId, $checkTime, $departmentId);
        }
        echo json_encode([
            "status" => true,
            "employee" => $nameEmployee,
            "action" => $action,
        ]);

        // echo json_encode([
        //     "status" => "success",
        //     "employee" => $nameEmployee,
        //     "action" => $action
        // ]);


    } else {
        echo json_encode([
            "status" => "failed",
            "message" => "Employee not found",
        ]);
    }

}
// algoritma

// ambil data dari post (idcard, waktu apa aja)

// cek apakah idcard ada di employees
// jika ada maka :
//     cek apakah dia sudah absen masuk apa blm:
//         jika tidak:
//             insert table dengan isi check in saja dan 
//             kirim message 'hadir tepat waktu'
//         jika ya:
//             update table dan isi di check-out dan
//             kirim message 'pulang tepat waktu INTINYA PULANG'

?>