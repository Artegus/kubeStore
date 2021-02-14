<?php

    function isFormFilled ($form) {

        $status = true;
        $emptyFields = [];

        foreach($form as $key => $value){
            if (empty($form[$key])){
                $status = false;
                $emptyFields[] = $key;
            }
        }

        return array($status, $emptyFields);
    }


    function trim_value ($value) {
        return trim($value);
    }

    function isFormValid ($form) {
        $status = true;
        $errors = [];

        foreach($form as $key => $value) {
            if(empty($form[$key])){
                $status = false;
                $errors[] = $key;
            }
        }

        return array($status, $errors);
    }

    function checkForm ($form, $filtersValidate) {
    
        [$isFormFilled, $emptyFields] = isFormFilled($form);

        // Default variables
        $dataForm = []; 
        $isFormValid = false;
        $errors = [];

        // Check if form is filled
        if ($isFormFilled) {
            // Trim values
            $tempForm = array_map('trim_value', $form);
            // Validate values
            $tempForm = filter_var_array($tempForm, $filtersValidate);
            // Check if form is valid
            [$isFormValid, $errors] = isFormValid($tempForm);

            if ($isFormValid) {
                // Finish
                $dataForm = $tempForm;
            }
        }

        return array($isFormFilled, $isFormValid, $emptyFields, $errors, $dataForm);
    }

    function registerUser ($user) {

        include('../db.php');

        ['user_name' => $username,
         'user_surname' => $surname,
         'user_gender' => $gender,
         'user_address' => $address,
         'user_email' => $email,
         'user_password' => $password
        ] = $user;

        $hashPassword = generatePasswordHash($password);

        $query = "INSERT INTO `user` (`user_name`, `user_surname`, `user_gender`, `user_address`, `user_email`, `user_password`, `user_rol`) 
                    VALUES (:user_name, :user_surname, :user_gender, :user_address, :user_email, :user_password, '1'); ";

        $stmt = $conn -> prepare($query);
        try {
            $status = $stmt -> execute(['user_name' => $username, 'user_surname' => $surname, 'user_gender' => $gender, 'user_address' => $address, 'user_email' => $email, 'user_password' => $hashPassword]);
        } catch (PDOException $e) {
            return false;
        }

        return $status;
    }


    function generatePasswordHash ($password) {
        return md5($password);
    }



?>