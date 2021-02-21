<?php

    $validateString = array(
        'filter' => FILTER_VALIDATE_REGEXP,
        'options' => array(
            'regexp' => "/[a-zA-záéíúóöüïëäÁÉÍÓÚñÑ\s]+/"
        )
    );


    $filtersValidate = array(
        'user_name' => $validateString,
        'user_surname' => $validateString,
        'user_gender' => array(
            'filter' => FILTER_VALIDATE_INT,
            'options' => array(
                'min_range' => 1,
                'max_range' => 3
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

?>