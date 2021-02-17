<?php

    include('./filtersUpdate.php');
    include('../utils/functions.php');

    if (isset($_POST['user_name'])) {

        if (isset($_POST['user_newPassword'])) {
            [$isFormFilled, $isFormValid, $emptyFields, $errors, $user] = checkForm($_POST, $filtersValidatePassword);

            $isPasswordEqual = checkActualPassword($user);

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

                if ($isPasswordEqual) {
                    $statusRegister = updateUser($user, true);

                    if ($statusRegister) {
                        echo json_encode(['status' => 'ok', 'message' => 'You have successfully updated. You will have to relogin again to see the changes']);
                    } else {
                        echo json_encode(['status' => 'error', 'message' => 'Error query']);
                    }

                } else {
                    echo json_encode(['status' => 'error', 'message' => 'The current password does not match the existing one']);
                }

            } else {
                $statusRegister = updateUser($user);

                if ($statusRegister) {
                    echo json_encode(['status' => 'ok', 'message' => 'Your details have been successfully updated. You will have to relogin again to see the changes']);
                } else {
                    echo json_encode(['status' => 'error-email', 'message' => 'Error']);
                }
            }

        }




    }

?>