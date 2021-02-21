<?php

    session_start();

    if (isset($_SESSION['connected'])) {
        
        ['user_id' => $user_id, 
        'user_name' => $user_name, 
        'user_surname' => $user_surname, 
        'user_rol' => $user_rol ] = $_SESSION['user'];

        if ($user_rol != 'administrador') {
            header('location: index.php');
        }

    } else {
        header('location: index.php');
    }

?>

<?php include('php/includes/header.php') ?>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js" integrity="sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ==" crossorigin="anonymous"></script>
<link href="https://unpkg.com/tabulator-tables@4.9.3/dist/css/tabulator.min.css" rel="stylesheet">
<script src="./js/panelControl.js" type="module"></script>
<title>KubeStore - Control Panel</title>
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
                        <?php
                            if ($user_rol == 'administrador') {
                        ?>
                            <a class="btn btn-outline-dark me-2 btn-action btn-user btn-admin" href="./controlPanel.php" data-id=<?=$user_id?> type="button">
                                Control Panel
                            </a>
                        <?php }?>
                        <a href="./carrito.php" class="btn btn-cart">
                            <i class="fas fa-shopping-cart"></i>
                        </a>
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


    <div class="table-content">

        <!-- Start search container -->
        <div class="table-container-index">
            <h3>Tables</h3>
            <ul>
                <button class="btn btn-outline-dark me-2 table-user">Users</button>
                <button class="btn btn-outline-dark me-2 table-products">Products <br> Categories <br>Brands</button>
                <button class="btn btn-outline-dark me-2 table-sales">Sales</button>
                <button class="btn btn-outline-dark me-2 table-history-products">History of products</button>
            </ul>

        </div>

        <!-- Start Content Products -->
        <div class="content-tables">

        </div>

        <!-- End Content Products -->


    </div>


</main>
<?php include('php/includes/footer.php'); ?>