<?php
    include('./filtersGeneral.php');
    include('../utils/functions.php');

    if (isset($_POST['user_name'])) {

        [$isFormFilled, $isFormValid, $emptyFields, $errors, $user] = checkForm($_POST, $filtersValidateAddNewUser);

        if(!$isFormFilled) {
            // Faltan rellenar campos
            echo json_encode(['status' => 'error-form', 'message' => 'Empty fields', 'errors' => $emptyFields]);
        } elseif($isFormFilled && !$isFormValid) {
            // Campos invalidos
            echo json_encode(['status' => 'error-form', 'message' => 'Invalid fields', 'errors' => $errors]);
        } elseif ($isFormValid && $isFormFilled) {
            // Todo bien, entonces se registra el usuario

            $statusRegister = addNewUser($user);

            if ($statusRegister) {
                echo json_encode(['status' => 'ok', 'message' => 'User successfully added']);
            } else {
                echo json_encode(['status' => 'error-email', 'message' => 'The email is already registered. Please use another email']);
            }
        }


    }

?>