<?php 
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include("apiKey.php");

if (!isset($_GET['apikey']) || $_GET['apikey'] !== $APIKEY) {
    http_response_code(401);
    echo json_encode([
        "status" => "error",
        "message" => "Unauthorized - API key salah"
    ]);
    exit;
} else {
    Header("Location: employeesData.php");
    
}

?>