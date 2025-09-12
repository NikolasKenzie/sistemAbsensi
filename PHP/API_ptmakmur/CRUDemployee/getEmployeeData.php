<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

include('../function/db.php');
include('../apiKey.php');

function getData($id)
{
    $getQuery = "SELECT * FROM employees WHERE id = '$id'";
    $res = queryDb($getQuery);

    return $res[0];

}
if (!isset($_GET['apikey']) || $_GET['apikey'] !== $APIKEY) {
    http_response_code(401);
    echo json_encode([
        "status" => "error",
        "message" => "Unauthorized - API key salah"
    ]);
    exit;
}

$id = isset($_GET['id']) ? intval($_GET['id']) : null;

if (isset($id)) {
    $data = getData($id);

    echo json_encode([
        'status' => 'success',
        'data' => $data
    ]);
}

?>