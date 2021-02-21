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
                        <?php
                            if ($user_rol == 'administrador') {
                        ?>
                            <a class="btn btn-outline-dark me-2 btn-action btn-user btn-admin" href="./controlPanel.php" data-id=<?=$user_id?> type="button">
                                Control Panel
                            </a>
                        <?php }?>
                        
                        <a href="./carrito.php" class="btn btn-cart">
                            <i class="fas fa-shopping-cart"></i>
                            <!-- <span class="cart-items">0</span> -->
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
                        <div class="row content-products">
                            <div class="col-sm-9 content-products-cart">
                                    
                            </div>

                        </div>

                    <!-- END Cart items -->

                </div>

            </section>


        <!-- END Cart section -->


    </main>
<?php include('php/includes/footer.php');?>