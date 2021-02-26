<?php

    $db_host = "mysql"; // Cambiar si usas wamp o xampp
    $db_username = "root";  // Cambiar si es necesario
    $db_password = "root";  // Cambiar si es necesario

    $db_name = "kubestore";  // Cambiar si se desea
    $db_charset = "utf8mb4";

    $dsn = "mysql:host={$db_host};dbname={$db_name};charset={$db_charset}";

    try {
        // $conn global variable
        $conn = new PDO($dsn, $db_username, $db_password, array(
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ));
    } catch (PDOException $e) {
        $e -> getMessage();
    }

?>