<?php

    include('../utils/functions.php');


    if (isset($_GET['products'])) {

        $products = getProducts();
        $brands = getBrands();

        echo json_encode([$products, $brands]);

    }

?>