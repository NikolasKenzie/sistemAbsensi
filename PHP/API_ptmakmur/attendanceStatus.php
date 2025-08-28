<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("function/db.php");
include("apiKey.php");

if (!isset($_GET['apikey']) || $_GET['apikey'] !== $APIKEY) {
    http_response_code(401);
    echo json_encode([
        "status" => "error",
        "message" => "Unauthorized - API key salah"
    ]);
    exit;
}

$status = isset($_GET['status']) ? $_GET['status'] : 'all';
$date = isset($_GET['date']) ? $_GET['date'] : '';
$name = isset($_GET['name']) ? $_GET['name'] : '';

$conditions = [];

if ($status !== 'all') {
    $conditions[] = "a.status = '" . mysqli_real_escape_string($conn, $status) . "'";
}

if (!empty($date)) {
    $conditions[] = "a.date = '" . mysqli_real_escape_string($conn, $date) . "'";
}


if (!empty($name)) {
    $conditions[] = "e.name LIKE '%" . mysqli_real_escape_string($conn, $name) . "%'";
}

$query = "
SELECT a.*, e.name AS employee_name
FROM attendance a
JOIN employees e ON a.employee_id = e.id
";

if (!empty($conditions)) {
    $query .= " WHERE " . implode(" AND ", $conditions);
}

$result = querydb($query);

echo json_encode($result);
