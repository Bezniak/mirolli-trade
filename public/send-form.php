<?php
header('Content-Type: application/json; charset=utf-8');

// Куда отправлять письма
$to = "tvbr@tut.by";
$subject = "Заявка с сайта";

// Получение данных из формы
$name         = $_POST['name']    ?? '';
$email        = $_POST['email']   ?? '';
$phone        = $_POST['phone']   ?? '';
$subjectField = $_POST['subject'] ?? '';
$message      = $_POST['message'] ?? '';

// Проверка обязательных полей
if (empty($name) || empty($email) || empty($phone) || empty($subjectField) || empty($message)) {
    echo json_encode(["ok" => false, "message" => "Пожалуйста, заполните все обязательные поля."]);
    exit;
}

// Формирование тела письма
$body = "
<h2>Новая заявка с формы обратной связи</h2>
<b>Имя:</b> $name <br>
<b>Email:</b> $email <br>
<b>Телефон:</b> $phone <br>
<b>Тема:</b> $subjectField <br>
<b>Сообщение:</b><br> $message
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