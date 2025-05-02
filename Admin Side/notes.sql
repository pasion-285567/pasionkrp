<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$conn = new mysqli('localhost', 'username', 'password', 'notes_db');

if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed']));
}

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $result = $conn->query('SELECT * FROM notes ORDER BY created_at DESC');
        $notes = [];
        while($row = $result->fetch_assoc()) {
            $notes[] = $row;
        }
        echo json_encode($notes);
        break;
}

$conn->close();
?>