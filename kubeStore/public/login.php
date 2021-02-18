<?php

    session_start();

    if (isset($_SESSION['connected'])) {
        header('location: index.php');
    }

?>


<?php include('php/includes/header.php') ?>
<script src="js/login.js" type="module"></script>
<title>KubeStore - Login</title>
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
                    <div class="d-flex mb-2 mb-lg-0 move-rigth">
                        <a class="btn btn-outline-dark me-2 btn-action btn-login" href="./login.php">
                            Login
                        </a>
                        <a class="btn btn-outline-dark me-2 btn-action btn-register" href="./register.php">
                            Register
                        </a>
                    </div>
            </div>
        </nav>
    </header>

    <!-- End Header -->

    <!-- Start Main -->
    <main id="main">
        <!-- Start Form Login -->
        <div class="container m-auto justify-content-center form-basic">
            <form class="col-lg-6 m-auto offset-lg3 form-login" method="POST" id="loginForm">
                <!-- Component Name and Last Name -->
                <div class="row">
                    <!-- Email -->
                    <div class="row">
                        <label class="form-label" for="email">Email</label>
                        <input id="email" name="email" type="email" class="form-control" placeholder="you@example.com" required>
                    </div>
                    <!-- !Email -->
                    <!-- Password -->
                    <div class="row">
                        <label class="form-label" for="password">Password</label>
                        <input id="password" name="password" type="password" class="form-control" placeholder="******" required>
                    </div>
                    <!-- !Password -->
                    <hr class="my-4">
                    <!-- Button Register -->
                    <div class="d-flex justify-content-center">
                        <input type="button" name="login" value="Log In" id="submit" class="w-50 btn btn-primary btn-lg">
                    </div>
                    <!-- !Button Register -->
            </form>
        </div>

        <!-- End Form Login -->

    </main>

<?php include('php/includes/footer.php'); ?>