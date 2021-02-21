<?php
    include('./filtersGeneral.php');
    include('../utils/functions.php');

    if (isset($_POST['user_name'])) {

        
        if (isset($_POST['user_newPassword'])) {
            [$isFormFilled, $isFormValid, $emptyFields, $errors, $user] = checkForm($_POST, $filtersValidatePassword);
        } else {
            [$isFormFilled, $isFormValid, $emptyFields, $errors, $user] = checkForm($_POST, $filtersValidate);
        }

        if(!$isFormFilled) {
            // Faltan rellenar campos
            echo json_encode(['status' => 'error-form', 'message' => 'Empty fields', 'errors' => $emptyFields]);
        } elseif($isFormFilled && !$isFormValid) {
            // Campos invalidos
            echo json_encode(['status' => 'error-form', 'message' => 'Invalid fields', 'errors' => $errors]);
        } elseif ($isFormValid && $isFormFilled) {
            // Todo bien, entonces se actualiza el usuario

            if (isset($_POST['user_newPassword'])) {

                $statusRegister = updateUserByAdmin($user, true);

                if ($statusRegister) {
                    echo json_encode(['status' => 'ok', 'message' => 'User successfully edited.']);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Error query']);
                }

            } else {
                $statusRegister = updateUserByAdmin($user);

                if ($statusRegister) {
                    echo json_encode(['status' => 'ok', 'message' => 'User successfully edited']);
                } else {
                    echo json_encode(['status' => 'error-email', 'message' => 'Error']);
                }
            }

        }


    }

?>