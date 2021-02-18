<?php

    include('../utils/functions.php');


    if (isset($_GET['products'])) {

        $products = getProducts();

        echo json_encode($products);

    }

?>