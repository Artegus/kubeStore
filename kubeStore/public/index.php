<?php

    session_start();

    if (isset($_SESSION['connected'])) {
        
        ['user_id' => $user_id, 
        'user_name' => $user_name, 
        'user_surname' => $user_surname, 
        'user_rol' => $user_rol ] = $_SESSION['user'];

    }

?>

<?php include('php/includes/header.php') ?>
<script src="./js/index.js" type="module"></script>
<title>KubeStore - Welcome to the best rubik's cube store</title>
</head>
<body>
<!-- Start Header -->
<header id="header">
    <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.php">
                <img src="./icon/Cube-2.svg" alt="" width="30" height="30" class="d-inline-block align-top">
                KubeStore
            </a>
                <div class="d-flex mb-lg-0">
                    <?php
                    if (isset($_SESSION['connected'])) {
                    ?>
                        <a class="btn btn-outline-dark me-2 btn-action btn-user" href="#" data-id=<?=$user_id?> type="button">
                            <?= $user_name . " " . $user_surname?>
                        </a>
                        <a href="./carrito.php" class="btn btn-cart">
                            <i class="fas fa-shopping-cart"></i>
                        </a>
                        <?php
                            if ($user_rol == 'admin') {
                        ?>
                            <a class="btn btn-outline-dark me-2 btn-action btn-user" href="#" data-id=<?=$user_id?> type="button">
                                Control Panel
                            </a>
                        <?php }?>
                        <a class="btn btn-outline-dark me-2 btn-action btn-logout">
                            Log out
                        </a>

                    <?php
                    } else {
                    ?>
                        <a class="btn btn-outline-dark me-2 btn-action btn-login" href="./login.php">
                            Login
                        </a>
                        <a class="btn btn-outline-dark me-2 btn-action btn-register" href="./register.php">
                            Register
                        </a>
                    <?php } ?>
                </div>
        </div>
    </nav>
</header>

<!-- End Header -->

<!-- Start Main -->
<main id="main">


    <div class="products">

        <!-- Start search container -->
        <div class="search-container">
            <h3>Filters</h3>
            <div class="search-product">
                <input class="form-control" type="search" id="search-input" placeholder="Search by name">
                <!-- <input class="btn btn-outline-success" type="button" value='Search' id="search" /> -->
                <input class="btn btn-outline-success" type="button" value='Show all products' id="reset" />
            </div>

            <div class="order-products">
                Order by
                <select name="order" id="orderBy">
                    <option value="" disabled selected>Select one option</option>
                    <option value="nameAscendent">Name ascending</option>
                    <option value="nameDescendent">Name descending</option>
                    <option value="priceAscendent">Price ascending</option>
                    <option value="priceDescendent">Price descending</option>
                </select>
            </div>


            <div class="search-input select-fabricante">
                <label for="fabricante">Show by brand</label>
                <select name="fabricante" id="select-fabricante">
                    <option value="" disabled selected>Select one option</option>
                </select>
            </div>

        </div>

        <!-- End search container -->

        <!-- Start Content Products -->
        <div class="row  row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 content-products">

        </div>

        <!-- End Content Products -->


    </div>


</main>

<?php include('php/includes/footer.php'); ?>