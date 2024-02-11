<?php

header('Access-Control-Allow-Origin: *');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once('phpmailer/src/Exception.php');
require_once('phpmailer/src/PHPMailer.php');
require_once('phpmailer/src/SMTP.php');

$mail = new PHPMailer(true);
$mail->SMTPDebug = 2;
$mail->isSMTP(); 

$mail->Host = 'imago.gohost.ru';

$mail->SMTPAuth = true;

$mail->Username = 'mail@bluebeans.ru';
$mail->Password = 'Jeff1989';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;  
$mail->CharSet = "utf-8";

$mail->setFrom('mail@bluebeans.ru', 'С bluebeans.ru');

$mail->addAddress('evgenij.baltais@yandex.ru');

$data = json_decode(file_get_contents('php://input'), true);

var_dump($data['items']);


$mail->isHTML(true);

$mail->Subject = 'Новый заказ из корзины:';
$mail->Body    = '<p style = "color: #000; font-size: 22px; line-height: 30px;">Данные с формы:</p>';

if ($data['name']) {
  $mail->Body    .= '<p style = "color: #000; font-size: 18px; line-height: 24px;">Имя: <span style = "font-weight: bold;">' . $data['name'] . '</span></p>';
}

if ($data['email']) {
  $mail->Body    .= '<p style = "color: #000; font-size: 18px; line-height: 24px;">Email: <span style = "font-weight: bold;">' . $data['email'] . '</span></p>';
}

if ($data['textarea']) {
  $mail->Body    .= '<p style = "color: #000; font-size: 18px; line-height: 24px;">Текст: <span style = "font-weight: bold;">' . $data['textarea'] . '</span></p>';
}
if ($data['payment']) {
  $mail->Body    .= '<p style = "color: #000; font-size: 18px; line-height: 24px;">Тип платежа: <span style = "font-weight: bold;">' . $data['payment'] . '</span></p>';
}
if ($data['order']) {
  $mail->Body    .= '<p style = "color: #000; font-size: 18px; line-height: 24px;">Заказ: <span style = "font-weight: bold;">' . $data['order'] . '</span></p>';
}

if ($data['items']) {
  $mail->Body    .= '<p style = "color: #000; font-size: 18px; line-height: 24px;">Заказ:</p>';
  foreach ($data['items'] as $item) {
    $mail->Body    .= '<p style = "color: #000; font-size: 18px; line-height: 24px;">
    <span style = "font-weight: bold;">' . $item['name'] . ', кол-во: ' . $item['amount'] . ', вес: ' . $item['weight'] . ', цена: ' . $item['price'] . '</span>
    </p>';
  }
}

if ($mail->send()) {
  echo "Email was sent!";
}

else {
  echo "Error!";
  var_dump("Error: " . $mail->ErrorInfo);
}

?>