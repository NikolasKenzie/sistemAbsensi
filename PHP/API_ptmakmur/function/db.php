<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pt_makmur";

$conn = mysqli_connect($servername, $username, $password, $dbname);
function queryDb($query){
    global $conn;
    $result = mysqli_query($conn, $query);

    if (!$result) {
        return false; // query gagal
    }

    $rows = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row; // simpan setiap baris ke array
    }

    return $rows;

}

?>