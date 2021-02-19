<?php

    include('../utils/functions.php');

    if (isset($_POST['delete'])) {

        $id = $_POST['id'];

        if(deleteUserById($id)) {
            echo json_encode(['status' => 'ok']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error trying to delete account']);
        }

    }

?>