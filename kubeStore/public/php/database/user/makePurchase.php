<?php

    include('../utils/functions.php');

    if (isset($_POST['user_id'])) {

        [
            'user_id' => $user_id,
            'listOfProducts' => $listOfProducts,
            'totalPrice' => $totalPrice
        ] = $_POST;

        if (count($listOfProducts) > 0) {
            $response = makePurchase($user_id, $listOfProducts, $totalPrice);
            echo json_encode(['status' => $response, 'purchase' => ['products' => $listOfProducts, 'totalPrice' => $totalPrice]]);
        } else {
            echo json_encode(['status' => 'Error. Empty cart']);
        }

    }

?>