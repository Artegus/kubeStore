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
            <!-- Start Hamburguer Menu -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- End Hamburguer Menu -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav m-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Cubicos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Cuboides</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">Minx</a>
                    </li>
                </ul>

                <div class="d-flex mb-2 mb-lg-0">
                    <?php
                    if (isset($_SESSION['connected'])) {
                    ?>
                        <a class="btn btn-outline-dark me-2 btn-action btn-user" href="#" data-id=<?=$user_id?> type="button">
                            <?= $user_name . " " . $user_surname?>
                        </a>
                        <a href="./carrito.php" class="btn btn-cart">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="cart-items">4</span>
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
        </div>
    </nav>
</header>

<!-- End Header -->

<!-- Start Main -->
<main id="main">


    <div class="products">

        <!-- Start search container -->
        <div class="search-container">

            <div class="search-product">
                <input class="form-control" type="search" id="search-input" placeholder="Search">
                <input class="btn btn-outline-success" type="button" value='Search' id="search" />
            </div>

            <div class="order-products">
                Ordenar por orden
                <select name="order" id="orderBy">
                    <option value="nombreDescendente">nombre descendente</option>
                    <option value="nombreAscendente">nombre descendente</option>
                    <option value="precioDescente">Precio descendente</option>
                    <option value="precioAscendente">Precio Ascendente</option>
                </select>
            </div>


            <div class="search-input select-fabricante">
                <label for="fabricante">Fabricante</label>
                <select name="fabricante" id="select-fabricante">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>

            <div class="search-input precio-min">
                <label for="PrecioMin">Precio Min.</label>
                <input type="number" name="precioMin" id="precioMin">
            </div>

            <div class="search-input precio-max">
                <label for="PrecioMax">Precio Max</label>
                <input type="number" name="precioMax" id="precioMax">
            </div>

        </div>

        <!-- End search container -->

        <!-- Start Content Products -->
        <div class="row  row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 content-products">

            <!-- Start Card item -->
            <!-- <div class="col product-card">
                <div class="card text-dark bg-light">
                    <img src="./images/shengshou-teraminx.jpg" class="card-img-top image-default" alt="...">
                    <div class="card-body">
                        <h5 class="card-title item-title">Cubo - Hekoo 6x6</h5>
                        <p class="card-text item-brand">Fabricante: Hekoo Cubes </p>
                        <p class="card-text item-price">Price: 10.20€</p>
                        <a href="#" class="btn me-2 btn-primary">+ info</a>
                        <a href="#" class="btn me-2 btn-warning">Add to cart <i class="fas fa-shopping-cart"></i></a>
                    </div>
                </div>
            </div> -->
            <!-- End Card item -->

        </div>

        <!-- End Content Products -->


    </div>


</main>

<?php include('php/includes/footer.php'); ?>