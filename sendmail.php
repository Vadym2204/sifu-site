<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer-6.9.1/src/Exception.php';
require './PHPMailer-6.9.1/src/PHPMailer.php';
require './PHPMailer-6.9.1/src/SMTP.php';

header('Content-Type: application/json');

$response = ['success' => false];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $login = $_POST['login'] ?? '';
    $email = $_POST['email'] ?? '';
    $text = $_POST['text'] ?? '';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('uk', './PHPMailer-6.9.1/language/');

    try {
        //Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'vadimcurko86@gmail.com'; 
        $mail->Password   = 'tqdi aabp swsz akxb'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 465;

        //Recipients
        $mail->setFrom('vadimcurko86@gmail.com', 'Mailer');
        $mail->addAddress('vadimcurko86@gmail.com');

        //Content
        $mail->isHTML(true);
        $mail->Subject = 'New form submission';
        $mail->Body    = "Name: $login<br>Email: $email<br>Message: $text";

        $mail->send();
        $response['success'] = true;
    } catch (Exception $e) {
        $response['error'] = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

echo json_encode($response);