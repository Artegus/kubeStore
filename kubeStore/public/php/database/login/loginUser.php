<?php

    session_start();

    include('./filters.php');
    include('../utils/functions.php');

    if (isset($_POST['login'])) {

        [$isFormFilled, $isFormValid, $emptyFields, $errors, $user] = checkForm($_POST, $filtersValidate);

        if (!$isFormFilled) {
            // No se ha rellenado algún campo
            echo json_encode(['status' => 'error-form', 'message' => 'Empty fields', 'errors' => $emptyFields]);
        } elseif ($isFormFilled && !$isFormValid) {
            // No es valido algún campo
            echo json_encode(['status' => 'error-form', 'message' => 'Invalid fields', 'errors' => $errors]);
        } elseif ($isFormFilled && $isFormValid) {
            // Comprobar usuario
            ['status' => $statusAuthenticate, 'user' => $userData] = authenticateUser($user);

            if ($statusAuthenticate) {
                $_SESSION['connected'] = 'ok';
                $_SESSION['user'] = $userData;
                echo json_encode(['status' => 'ok', 'message' => "You are logged in", 'user' => $userData]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Invalid email or password']);
            }

        }
        

    }

?>