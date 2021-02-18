<?php

    $validateString = array(
        'filter' => FILTER_VALIDATE_REGEXP,
        'options' => array(
            'regexp' => "/[a-zA-záéíúóöüïëäÁÉÍÓÚ\s]+/"
        )
    );

    $filtersValidate = array(
        'user_id' => FILTER_UNSAFE_RAW,
        'user_name' => $validateString,
        'user_surname' => $validateString,
        'user_address' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array(
                'regexp' => "/^[a-zA-záéíúóöüïëäÁÉÍÓÚ0-9\s]+$/"
            )
        )
    );

    $filtersValidatePassword = array(
        'user_id' => FILTER_UNSAFE_RAW,
        'user_name' => $validateString,
        'user_surname' => $validateString,
        'user_address' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array(
                'regexp' => "/^[a-zA-záéíúóöüïëäÁÉÍÓÚ0-9\s]+$/"
            )
        ),
        'user_newPassword' => FILTER_UNSAFE_RAW,
        'user_actualPassword' => FILTER_UNSAFE_RAW
    );

?>