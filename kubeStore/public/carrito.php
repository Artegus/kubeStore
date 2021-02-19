<?php

    session_start();

    if (!isset($_SESSION['connected'])) {
        header('location: index.php');
    // verificar que tipo de usuario es
    // Añadir el nombre del usuario a la sección de ajustes de usuario
    // Cuando entre en sus ajustes crear un div para que pueda modificar
    // sus campos. (email, no se podrá cambiar)
    } else {

        ['user_id' => $user_id, 
        'user_name' => $user_name, 
        'user_surname' => $user_surname, 
        'user_rol' => $user_rol ] = $_SESSION['user'];
    }

?>

<?php include('php/includes/header.php');?>
<script src="js/carrito.js" type="module"></script>
<title>KubeStore - Cart</title>
</head>

<body>

    <!-- Start Header -->
    <header id="header">
        <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="./index.php">
                    <img src="./icon/Cube-2.svg" alt="" width="30" height="30" class="d-inline-block align-top">
                    KubeStore
                </a>
                    <div class="d-flex mb-2 mb-lg-0">
                        <a class="btn btn-outline-dark me-2 btn-action btn-user" href="#" data-id=<?=$user_id?> type="button">
                            <?= $user_name . " " . $user_surname?>
                        </a>
                        <a href="./carrito.php" class="btn btn-cart">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="cart-items">4</span>
                        </a>
                        <a class="btn btn-outline-dark me-2 btn-action btn-logout">
                            Log out
                        </a>
                    </div>
            </div>
        </nav>
    </header>

    <!-- End Header -->

    <!-- Start Main -->
    <main id="main">

        <!-- Start Cart section -->

            <section id="cart" class="py-3">

                <div class="container-fluid w-75">
                    <h5>Your cart</h5>

                    <!-- Start Cart items -->

                        <div class="row">
                            <div class="col-sm-9">
                                <!-- start Cart item -->
                                <div class="row border-top py-3 mt-3">
                                    <div class="col-sm-2">
                                        <img src="./images/shengshou-teraminx.jpg" alt="cart_item_1" class="img-fluid">
                                    </div>
                                    <div class="col-sm-8">
                                        <h6>Cube - XaSphi</h6>
                                        <h6>Fabricante: Kinshotu</h6>
                                        <!-- Amount -->
                                        <div class="qty d-flex pt-2">
                                            <div class="d-flex w-25">
                                                <button class="qty-up border bg-light"><i class="fas fa-angle-up"></i></button>
                                                <input type="text" class="qty_input border px-2 w-50 bg-light" disabled value="1">
                                                <button class="qty-up border bg-light"><i class="fas fa-angle-down"></i></button>
                                            </div>
                                            <button type="submit" class="btn btn-outline-danger  px-3 m-auto">
                                                Delete
                                            </button>
                                        </div>
                                        <!-- Amount -->
                                    </div>
                                    <!-- start Price item-->
                                    <div class="col-sm-2 text-right">
                                        <div class="text-danger">
                                            <span class="product_price">10</span> €
                                        </div>
                                    </div>
                                    <!-- END Price item-->
                                </div>
                                <!-- end Cart item -->

                                <div class="row border-top py-3 mt-3">
                                    <div class="col-sm-2">
                                        <img src="./images/shengshou-teraminx.jpg" alt="cart_item_1" class="img-fluid">
                                    </div>
                                    <div class="col-sm-8">
                                        <h6>Cube - XaSphi</h6>
                                        <h6>Fabricante: Kinshotu</h6>
                                        <!-- Amount -->
                                        <div class="qty d-flex pt-2">
                                            <div class="d-flex w-25">
                                                <button class="qty-up border bg-light"><i class="fas fa-angle-up"></i></button>
                                                <input type="text" class="qty_input border px-2 w-50 bg-light" disabled value="1">
                                                <button class="qty-up border bg-light"><i class="fas fa-angle-down"></i></button>
                                            </div>
                                            <button type="submit" class="btn btn-outline-danger px-3 m-auto">
                                                Delete
                                            </button>
                                        </div>
                                        <!-- Amount -->
                                    </div>
                                    <!-- start Price item-->
                                    <div class="col-sm-2 text-right">
                                        <div class="text-danger">
                                            <span class="product_price">10</span> €
                                        </div>
                                    </div>
                                    <!-- END Price item-->
                                </div>
                            </div>

                            <!-- START Subtotal section -->

                            <div class="col-sm-3">
                                <div class="sub-total border text-center mt-2">
                                    <h6 class="text-success py-3">Your order is ready to buy</h6>
                                    <div class="border-top py-4">
                                        <h7 class="">Subtotal ( 2 items ) <span class="text-danger" id="total-price">20</span> €</h7>
                                        
                                    </div>
                                    <button type="submit" class="btn btn-success">Buy</button>
                                </div>
                            </div>

                            <!-- END Subtotal section -->
                        </div>

                    <!-- END Cart items -->

                </div>

            </section>


        <!-- END Cart section -->


    </main>
<?php include('php/includes/footer.php');?>