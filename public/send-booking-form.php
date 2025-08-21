<?php
header('Content-Type: application/json; charset=utf-8');

// Куда отправлять письма
$to = "tvbr@tut.by";
$subject = "Заявка с сайта";

// Получение данных
$fullName     = $_POST['fullName'] ?? '';
$phone        = $_POST['phone'] ?? '';
$email        = $_POST['email'] ?? '';
$objectType   = $_POST['objectType'] ?? '';
$serviceType  = $_POST['serviceType'] ?? '';
$startDate    = $_POST['startDate'] ?? '';
$objectSize   = $_POST['objectSize'] ?? '';
$accessibility= $_POST['accessibility'] ?? '';
$complexity   = $_POST['complexity'] ?? '';
$comment      = $_POST['comment'] ?? '';
$files        = $_POST['files'] ?? '';

// Проверка обязательных
if (empty($fullName) || empty($phone)) {
    echo json_encode(["ok" => false, "message" => "Пожалуйста, заполните обязательные поля (ФИО и телефон)."]);
    exit;
}

// Формируем тело
$body = "
<h2>Новая заявка с сайта</h2>
<b>Имя:</b> $fullName <br>
<b>Телефон:</b> $phone <br>
<b>Email:</b> $email <br>
<b>Тип объекта:</b> $objectType <br>
<b>Вид услуги:</b><br> $serviceType <br>
<b>Дата начала работ:</b> $startDate <br>
<b>Размер объекта:</b> $objectSize <br>
<b>Доступность:</b> $accessibility <br>
<b>Сложность:</b><br> $complexity <br>
<b>Комментарий:</b><br> $comment <br>
<b>Файлы:</b> $files
";

// Заголовки
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: no-reply@vyvoztechniki.by\r\n";
if (!empty($email)) {
    $headers .= "Reply-To: $email\r\n";
}

// Отправка
if (mail($to, $subject, $body, $headers, "-fno-reply@vyvoztechniki.by")) {
    echo json_encode(["ok" => true, "message" => "Сообщение успешно отправлено"]);
} else {
    echo json_encode(["ok" => false, "message" => "Ошибка при отправке сообщения."]);
}
?>
