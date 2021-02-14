<?php

    $validateString = array(
        'filter' => FILTER_VALIDATE_REGEXP,
        'options' => array(
            'regexp' => "/[a-zA-záéíúóöüïëäÁÉÍÓÚ\s]+/"
        )
    );


    $filtersValidate = array(
        'user_name' => $validateString,
        'user_surname' => $validateString,
        'user_gender' => array(
            'filter' => FILTER_VALIDATE_INT,
            'options' => array(
                'min_range' => 0,
                'max_range' => 2
            )
        ),
        'user_address' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array(
                'regexp' => "/^[a-zA-záéíúóöüïëäÁÉÍÓÚ\s]+$/"
            )
        ),
        'user_email' => array(
            'filter' => FILTER_VALIDATE_EMAIL
        ),
        'user_password' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array(
                'regexp' => "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/"
            )
        )
    );

?>