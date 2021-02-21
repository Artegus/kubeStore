<?php
$validateString = array(
    'filter' => FILTER_VALIDATE_REGEXP,
    'options' => array(
        'regexp' => "/[a-zA-záéíúóöüïëäÁÉÍÓÚñÑ\s]+/"
    )
);
// Update User
    $filtersValidate = array(
        'user_id' => FILTER_UNSAFE_RAW,
        'user_name' => $validateString,
        'user_surname' => $validateString,
        'user_email' => FILTER_VALIDATE_EMAIL,
        'user_address' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array(
                'regexp' => "/^[a-zA-záéíúóöüïëäÁÉÍÓÚñÑ0-9\s]+$/"
            )
        )
    );

    $filtersValidatePassword = array(
        'user_id' => FILTER_UNSAFE_RAW,
        'user_name' => $validateString,
        'user_surname' => $validateString,
        'user_email' => FILTER_VALIDATE_EMAIL,
        'user_address' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array(
                'regexp' => "/^[a-zA-záéíúóöüïëäÁÉÍÓÚñÑ0-9\s]+$/"
            )
        ),
        'user_newPassword' => FILTER_UNSAFE_RAW,
    );
// Update user

// Add new user

    $filtersValidateAddNewUser = array(
        'user_name' => $validateString,
        'user_surname' => $validateString,
        'user_gender' => array(
            'filter' => FILTER_VALIDATE_INT,
            'options' => array(
                'min_range' => 1,
                'max_range' => 3
            )
        ),
        'user_rol' => array(
            'filter' => FILTER_VALIDATE_INT,
            'options' => array(
                'min_range' => 1,
                'max_range' => 2
            )
        ),
        'user_address' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array(
                'regexp' => "/^[a-zA-záéíúóöüïëäÁÉÍÓÚ0ñÑ0-9\s]+$/"
            )
        ),
        'user_email' => array(
            'filter' => FILTER_VALIDATE_EMAIL
        ),
        'user_password' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array(
                'regexp' => "/^(?=.*[a-záéíúóñ])(?=.*[A-ZÁÉÍÚÓÑ])(?=.*\d)[a-záéíúóñA-ZÁÉÍÓÚÑ\d]{8,}$/"
            )
        )
    );


// Add new user

?> 