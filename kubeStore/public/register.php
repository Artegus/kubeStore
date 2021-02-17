<?php

    session_start();

    if (isset($_SESSION['connected'])) {
        header('location: index.php');
    }

?>

<?php include('php/includes/header.php') ?>

<title>KubeStore - Register</title>
<script src="js/register.js" type="module"></script>
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
                        <a class="btn btn-outline-dark me-2 btn-action btn-login" href="./login.php">
                            Login
                        </a>
                        <a class="btn btn-outline-dark me-2 btn-action btn-register" href="./register.php">
                            Register
                        </a>
                    </div>

                </div>
            </div>
        </nav>
    </header>

    <!-- End Header -->

    <!-- Start Main -->
    <main id="main">
        <!-- Start Form Login -->
        <div class="container flex-column justify-content-center form-basic">

            <form method="POST" class="col-lg-6 m-auto offset-lg3 form-login" id="registerForm">
                <h2>Register</h2>
                <hr class="my-4">
                <!-- Component Name and Last Name -->
                <div class="row">
                    <!-- First Name -->
                    <div class="col">
                        <label class="form-label" for="firstName">First Name</label>
                        <input name="firstName" id="firstName" type="text" class="form-control" placeholder="First name" required>
                    </div>
                    <!-- !First Name -->
                    <!-- Last Name - Surname -->
                    <div class="col">
                        <label class="form-label" for="lastName">Last Name</label>
                        <input name="lastName" id="lastName" type="text" class="form-control" placeholder="Last name" required>
                    </div>
                    <!-- !Last Name - Surname -->
                </div>
                <!-- !Component Name and Last Name -->
                <hr class="my-4">
                <h4 class="mb-3">Select your gender</h4>
                <!-- Gender -->
                <div class="my-3">
                    <div class="form-check">
                        <input id="male" name="gender" type="radio" class="form-check-input" value="1" required>
                        <label class="form-check-label" for="male">Male</label>
                    </div>
                    <div class="form-check">
                        <input id="female" name="gender" type="radio" class="form-check-input" value="2">
                        <label class="form-check-label" for="female">Female</label>
                    </div>
                    <div class="form-check">
                        <input id="none" name="gender" type="radio" class="form-check-input" value="3" checked>
                        <label class="form-check-label" for="none">None</label>
                    </div>
                </div>
                <!-- !Gender -->
                <!-- Address-->
                <div class="col">
                    <label class="form-label" for="address">Address</label>
                    <input name="address" id="address" type="text" class="form-control" placeholder="Address Line" required>
                </div>
                <!-- !Address-->
                <!-- Email -->
                <div class="col">
                    <label class="form-label" for="email">Email</label>
                    <input id="email" name="email" type="email" class="form-control" placeholder="you@example.com" required>
                </div>
                <!-- !Email -->
                <!-- Password -->
                <div class="col">
                    <label class="form-label" for="password">Password</label>
                    <input id="password" name="password" type="password" class="form-control" minlength="8" required>
                </div>
                <!-- !Password -->
                <!-- Repeat Password -->
                <div class="col">
                    <label class="form-label" for="repassword">Repeat your password</label>
                    <input id="repassword" name="repassword" type="password" class="form-control" minlength="8" required>
                </div>
                <!-- !Repeat Password -->

                <hr class="my-4">
                <!-- Button Register -->
                <div class="d-flex justify-content-center">
                    <input type="button" name="register" value="Register" id="submit" class="w-50 btn btn-primary btn-lg">
                </div>
                <!-- !Button Register -->
            </form>
        </div>

        <!-- End Form Login -->

    </main>

    <?php include('php/includes/footer.php'); ?>