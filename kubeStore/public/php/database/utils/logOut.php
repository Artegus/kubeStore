<?php

    session_start();

    $loginPath = "../../../index.php";

    function resetSession () {
        // Delete variables session
        unset($_SESSION);
        // Delete cookie session
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '', 
            time() - 3600, 
            $params['path'], 
            $params['domain'], 
            $params['secure'], 
            isset($params['httponly'])
        );
        // Destroy session
        session_destroy();

        if (!isset($_SESSION['connected'])) {
            return true;
        }

        return false;
    }

    if (isset($_SESSION['connected'])) {

        $statusSession = resetSession();

        if ($statusSession) {
            // Sesión cerrada correctamente.
            echo json_encode(['status' => 'ok', 'message' => 'Log out!']);
        } else {
            // Error al cerrar la sesión.
            echo json_encode(['status' => 'error', 'message' => 'Error in log out']);
        }

    }

?>