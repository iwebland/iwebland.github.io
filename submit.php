<?php
$servername = "localhost:3306";
$username = "designto_1";
$password = Kimxan110784;
$dbname = "designto_db";

// Создание соединения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Получение данных из POST
$date_range = $conn->real_escape_string($_POST['date-range']);
$adults = intval($_POST['adults']);
$children = intval($_POST['children']);

// SQL запрос для вставки данных
$sql = "INSERT INTO bookings (date_range, adults, children) VALUES ('$date_range', $adults, $children)";

if ($conn->query($sql) === TRUE) {
    echo "Новое бронирование успешно создано";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
