<?php

    include('../utils/functions.php');

    if (isset($_GET['user_id'])) {

        $id = $_GET['user_id'];

        $userData = getUserById($id);

        if ($userData != false) {
            echo json_encode($userData);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Query problem or user not exists']);
        }
    }

?>