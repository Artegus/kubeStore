<?php

    include('../utils/functions.php');

    if (isset($_POST['product_id'])) {

        $productId = $_POST['product_id'];

        $statusDelete = removeProductById($productId);

        if ($statusDelete) {
            echo json_encode(['status' => 'ok', 'message' => 'Product deleted correctly']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error on delete']);
        }


    }

?>