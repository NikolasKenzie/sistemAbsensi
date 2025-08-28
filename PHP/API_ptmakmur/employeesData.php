<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

include("function/db.php");
include("apiKey.php");

// Cek API key
if (!isset($_GET['apikey']) || $_GET['apikey'] !== $APIKEY) {
    http_response_code(401);
    echo json_encode([
        "status" => "error",
        "message" => "Unauthorized - API key salah"
    ]);
    exit;
}

$id   = isset($_GET['id']) ? intval($_GET['id']) : null;
$name = isset($_GET['name']) ? $_GET['name'] : null;
$email = isset($_GET['email']) ? $_GET['email'] : null;

$query = "SELECT * FROM employees";

$conditions = [];

if ($id) {
    $conditions[] = "id = $id";
}
if ($name) {
    $name = mysqli_real_escape_string($conn, $name);
    $conditions[] = "name LIKE '%$name%'";
}
if ($email) {
    $name = mysqli_real_escape_string($conn, $email);
    $conditions[] = "email LIKE '%$email%'";
}
if (!empty($conditions)) {
    $query .= " WHERE " . implode(" AND ", $conditions);
}

$result = querydb($query);
echo json_encode($result);
?>