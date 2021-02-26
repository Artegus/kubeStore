<?php

    include('./filtersGeneral.php');
    include('../utils/functions.php');

    if (isset($_POST)) {
        
        // Se hace esto para que pase la validación.
        if (count($_FILES) > 0) {
            $_POST['product_image'] = $_FILES['image']['name']; // Default 
        } else {
            $_POST['product_image'] = 'sameImage'; // Default
        }

        [$isFormFilled, $isFormValid, $emptyFields, $errors, $product] = checkForm($_POST, $filtersValidateUpdateProduct);

        if(!$isFormFilled) {
            // Faltan rellenar campos
            echo json_encode(['status' => 'error-form', 'message' => 'Empty fields', 'errors' => $emptyFields]);
        } elseif($isFormFilled && !$isFormValid) {
            // Campos invalidos
            echo json_encode(['status' => 'error-form', 'message' => 'Invalid fields', 'errors' => $errors]);
        } elseif ($isFormValid && $isFormFilled) {

            if (count($_FILES) > 0) {
                // Update con imagen 
                $statusUploadPhoto = uploadImage($_FILES['image']);

                if ($statusUploadPhoto) {

                    $statusAddProduct = updateProduct($product, true);
    
                    if ($statusAddProduct) {
                        echo json_encode(['status' => 'ok', 'message' => 'Product successfully updated']);
                    } else {
                        echo json_encode(['status' => 'error', 'message' => 'Error Update Product']);
                    }
    
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Error upload image']);
                }

            } else {
                // Update sin imagen
                $statusAddProduct = updateProduct($product); 
    
                    if ($statusAddProduct) {
                        echo json_encode(['status' => 'ok', 'message' => 'Product successfully updated']);
                    } else {
                        echo json_encode(['status' => 'error', 'message' => 'Error Update Product']);
                    }

            }

        }


    }

?>