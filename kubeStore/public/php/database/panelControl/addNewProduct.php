<?php

    include('./filtersGeneral.php');
    include('../utils/functions.php');

    if (isset($_POST) && isset($_FILES)) {
        
        $_POST['product_image'] = $_FILES['image']['name']; // Default

        [$isFormFilled, $isFormValid, $emptyFields, $errors, $product] = checkForm($_POST, $filtersValidateAddNewProduct);

        if(!$isFormFilled) {
            // Faltan rellenar campos
            echo json_encode(['status' => 'error-form', 'message' => 'Empty fields', 'errors' => $emptyFields]);
        } elseif($isFormFilled && !$isFormValid) {
            // Campos invalidos
            echo json_encode(['status' => 'error-form', 'message' => 'Invalid fields', 'errors' => $errors]);
        } elseif ($isFormValid && $isFormFilled) {
            // Todo bien, entonces se añade el producto.

            // Primero se sube la foto.
            $statusUploadPhoto = uploadImage($_FILES['image']);
            // Se añade la foto al directorio ./images/
            // Se añade el producto a la base de datos

            if ($statusUploadPhoto) {
                $statusAddProduct = addNewProduct($product);

                if ($statusAddProduct) {
                    echo json_encode(['status' => 'ok', 'message' => 'Product successfully added']);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Error INSERT Product']);
                }

            } else {
                echo json_encode(['status' => 'error', 'message' => 'Error upload image']);
            }

        }
        


    } 

?>