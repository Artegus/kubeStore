<?php

    include('../utils/functions.php');

    if (isset($_POST['register_id'])) {

        $registerId = $_POST['register_id'];

        $statusRemove = removeBackupRegisterById($registerId);

        if ($statusRemove) {
            echo json_encode(['status' => 'ok', 'message' => 'Register deleted correctly']);
        } else { 
            echo json_encode(['status' => 'error', 'message' => 'Error on delete']);
        }

    }

?>