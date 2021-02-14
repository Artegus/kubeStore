<?php

    include('./filters.php');
    include('./functions.php');

    if (isset($_POST['user_name'])) {

        [$isFormFilled, $isFormValid, $emptyFields, $errors, $user] = checkForm($_POST, $filtersValidate);

        if(!$isFormFilled) {
            // Faltan rellenar campos
            echo json_encode($emptyFields);
        } elseif($isFormFilled && !$isFormValid) {
            // Campos invalidos
            echo json_encode($errors);
        } elseif ($isFormValid && $isFormFilled) {
            // Todo bien, entonces se registra el usuario

            $statusRegister = registerUser($user);

            if ($statusRegister) {
                echo json_encode(['status' => 'ok', 'message' => 'User registered successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'The email is already registered']);
            }
        }

    }

?>