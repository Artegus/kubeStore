<?php

    include('../db.php');

    function isFormFilled ($form) {

        $status = true;
        $emptyFields = [];

        foreach($form as $key => $value){
            if (empty($form[$key])){
                $status = false;
                $emptyFields[] = $key;
            }
        }

        return array($status, $emptyFields);
    }


    function trim_value ($value) {
        return trim($value);
    }

    function isFormValid ($form) {
        $status = true;
        $errors = [];

        foreach($form as $key => $value) {
            if(empty($form[$key])){
                $status = false;
                $errors[] = $key;
            }
        }

        return array($status, $errors);
    }

    function checkForm ($form, $filtersValidate) {
    
        [$isFormFilled, $emptyFields] = isFormFilled($form);

        // Default variables
        $dataForm = []; 
        $isFormValid = false;
        $errors = [];

        // Check if form is filled
        if ($isFormFilled) {
            // Trim values
            $tempForm = array_map('trim_value', $form);
            // Validate values
            $tempForm = filter_var_array($tempForm, $filtersValidate);
            // Check if form is valid
            [$isFormValid, $errors] = isFormValid($tempForm);

            if ($isFormValid) {
                // Finish
                $dataForm = $tempForm;
            }
        }

        return array($isFormFilled, $isFormValid, $emptyFields, $errors, $dataForm);
    }

    function registerUser ($user) {

        global $conn;

        ['user_name' => $username,
         'user_surname' => $surname,
         'user_gender' => $gender,
         'user_address' => $address,
         'user_email' => $email,
         'user_password' => $password
        ] = $user;

        $hashPassword = generatePasswordHash($password);

        $query = "INSERT INTO `user` (`user_name`, `user_surname`, `user_gender`, `user_address`, `user_email`, `user_password`, `user_rol`) 
                    VALUES (:user_name, :user_surname, :user_gender, :user_address, :user_email, :user_password, '1'); ";

        $stmt = $conn -> prepare($query);
        try {
            $status = $stmt -> execute(['user_name' => $username, 'user_surname' => $surname, 'user_gender' => $gender, 'user_address' => $address, 'user_email' => $email, 'user_password' => $hashPassword]);
        } catch (PDOException $e) {
            return false;
        }

        return $status;
    }


    function generatePasswordHash ($password) {
        return md5($password);
    }


    function authenticateUser ($user) {

        global $conn;

        ['user_email' => $email,
         'user_password' => $password] = $user;

        $hashPassword = generatePasswordHash($password);

        $query = " SELECT a.user_id, a.user_name, a.user_surname, a.user_email, a.user_address, a.user_gender, b.rol_name as user_rol
            FROM `user` as a 
            INNER JOIN `rol` as b ON a.user_rol = b.rol_id 
            WHERE a.user_email = :email AND a.user_password = :password
        ";

        $stmt = $conn -> prepare($query);

        try {
            
            $stmt -> execute(['email' => $email, 'password' => $hashPassword]);

            $userData = $stmt -> fetchAll();

            $records = $stmt -> rowCount();

            $status = $records == 1 ? true : false;

        } catch (PDOException $e) {
            return array('status' => false, 'user' => '');
        }

        $userData = userDefault($userData[0]);

        return array('status' => $status, 'user' => $userData);
    }

    // Return default object user
    function userDefault ($user) {
        return [
            'user_id' => $user['user_id'],
            'user_name' => $user['user_name'],
            'user_surname' => $user['user_surname'],
            'user_email' => $user['user_email'],
            'user_address' => $user['user_address'],
            'user_gender' => $user['user_gender'],
            'user_rol' => $user['user_rol']
        ];
    }

    function getUserById ($id) {

        global $conn;

        $query = "SELECT a.user_id, a.user_name, a.user_surname, a.user_email, a.user_address, a.user_gender, b.rol_name as user_rol
            FROM `user` as a 
            INNER JOIN `rol` as b ON a.user_rol = b.rol_id 
            WHERE a.user_id = :id
        ";

        $stmt = $conn -> prepare($query);

        try {

            $stmt -> execute(['id' => $id]);

            $userData = $stmt -> fetchAll();

            $user = userDefault($userData[0]);

        } catch (PDOException $e) {
            return false;
        }

        return $user;
    }

    function checkActualPassword ($user) {

        global $conn;

        [
            'user_id' => $id,
            'user_actualPassword' => $actualPassword
        ] = $user;

        $hashPassword = generatePasswordHash($actualPassword);

        $query = "SELECT * FROM user WHERE user_password = :password AND user_id = :id";

        $stmt = $conn -> prepare($query);
        
        $stmt -> execute(['id' => $id, 'password' => $hashPassword]);

        $records = $stmt -> rowCount();

        if ($records == 1) {
            return true;
        } else {
            return false;
        }

    }

    function updateUser ($user, $changePassword = false) {

        global $conn;

        [
            'user_id' => $id,
            'user_name' => $name,
            'user_surname' => $surname,
            'user_address' => $address,
            'user_newPassword' => $newPassword
        ] = $user;

        $hashPassword = generatePasswordHash($newPassword);

        if($changePassword) {
            // Update user whith new password.
            $query = "UPDATE user 
            SET user_name = :name , user_surname = :surname, user_address = :address , user_password = :password
            WHERE user_id = :id";

            $stmt = $conn -> prepare($query);

            try {
                $status = $stmt -> execute(['name' => $name, 'surname' => $surname, 'address' => $address, 'password' => $hashPassword, 'id' => $id]);
            } catch (PDOException $e) {
                return false;
            }            

            return $status;

        } else {
            // Update user without changing password.
            $query = "UPDATE user
            SET user_name = :name , user_surname = :surname, user_address = :address 
            WHERE user_id = :id";

            $stmt = $conn -> prepare($query);
                    
            try {
                $status = $stmt -> execute(['name' => $name, 'surname' => $surname, 'address' => $address, 'id' => $id]);
            } catch (PDOException $e) {
                return false;
            }            
            
            return $status;
        }

    }

    function getProducts () {

        global $conn;

        $query = "SELECT product.product_id, product.product_name, product.product_description, product.product_amount, product.product_price, 
                        product.product_image, brand.brand_name as product_brand, category.category_name as product_category
        FROM `product` as product 
        INNER JOIN `brand` as brand ON product.product_brand = brand.brand_id
        INNER JOIN `category` as category ON product.product_category = category.category_id
        WHERE product.product_amount <> 0
        ";

        try {

            $stmt = $conn -> prepare($query);

            $stmt -> execute();

            $products = $stmt -> fetchAll();

        } catch (PDOException $e) {
            return false;
        }

        return $products;
    }


    function getBrands () {
        global $conn;

        $query = "SELECT brand.brand_name 
        FROM `brand`";

        try {
            
            $stmt = $conn -> prepare($query);

            $stmt -> execute();

            $brands = $stmt -> fetchAll();

        } catch (PDOException $e) {
            return false;
        }

        return $brands;

    }


    function deleteUserById ($id) {

        global $conn;

        $query = "DELETE FROM user WHERE user_id = :id";

        $stmt = $conn -> prepare($query);

        try {
            $status = $stmt -> execute(['id' => $id]);
        } catch (PDOException $e) {
            return false;
        }

        return $status;
    }

    function makePurchase ($user_id, $products, $totalPrice) {

        global $conn;
        
        $errors = [];
        $successes = [];

        // Primero. Añadir a sale la venta
        $statusInsertSale = insertNewSale($user_id, $totalPrice);
        // Segundo. Añadir cada producto a saleInformation
        if ($statusInsertSale['status'] == 'ok') {
            $sale_id = $statusInsertSale['lastId'];
        } else {
            return $errors[] = "Error. Insert sale";
        }
        
        foreach($products as $key => $product) {
            
            $product_id = $product['product_id'];
            $product_amount = $product['product_amount'];
            $product_name = $product['product_name'];

            $query = "INSERT INTO `saleInformation` (`sale_id`, `product_id`, `amount`) 
            VALUES (:sale_id, :product_id, :product_amount)";

            $stmt = $conn -> prepare($query);
            try {
                // Añadido a SaleInformation
                $stmt -> execute(['sale_id'=> $sale_id, 'product_id' => $product_id, 'product_amount' => $product_amount]);

                // Actualizar tabla de productos 
                $querySubstract = "UPDATE `product` SET `product_amount` = `product_amount` - :product_amount 
                WHERE `product_id` = :product_id";

                $stmtSubstract = $conn -> prepare($querySubstract);

                $result = $stmtSubstract -> execute(['product_amount' => $product_amount, 'product_id' => $product_id]);

                if ($result) { // Compra de producto realizada
                    $successes[] = "$product_name";
                }

            } catch (PDOException $e) {
                $errors[] = "$product_name";
            }

        }

        return array('success' => $successes, 'errors' => $errors);
    }

    function insertNewSale ($user_id, $totalPrice) {

        global $conn;

        $query = "INSERT INTO `sale` (`sale_user`, `sale_totalPrice`) 
        VALUES (:user_id, :totalPrice)";

        $stmt = $conn -> prepare($query);
        try {
            $status = $stmt -> execute(['user_id' => $user_id, 'totalPrice' => $totalPrice]);
            $lastId = $conn -> lastInsertId();
            if ($status) {
                return array('status' => 'ok', 'lastId' => $lastId);
            }
        } catch (PDOException $e) {
            return array('status' => 'error');
        }

    }

    function getUsersData () {

        global $conn;

        $query = "SELECT user.user_id, user.user_name, user.user_surname, gender.gender_name as user_gender, user.user_address, 
                        user.user_email, user.user_createdAt , rol.rol_name as user_rol 
            FROM `user` as user 
            INNER JOIN `rol` as rol ON user.user_rol = rol.rol_id 
            INNER JOIN `gender` as gender ON user.user_gender = gender.gender_id";

        $stmt = $conn -> prepare($query);

        try {

            $status = $stmt -> execute();

            if ($status) {
                $data = $stmt -> fetchAll();
                return ['status' => 'ok', 'data' => $data];
            }

        } catch (PDOException $e) {
            return ['status' => 'error', 'data' => 'empty'];
        }
    }

    function getHistoryUsersData () {
        global $conn;

        $query = "SELECT * FROM `backupUser`";

        $stmt = $conn -> prepare($query);

        try {

            $status = $stmt -> execute();

            if ($status) {
                $data = $stmt -> fetchAll();
                return ['status' => 'ok', 'data' => $data];
            }

        } catch (PDOException $e) {
            return ['status' => 'error', 'data' => 'empty'];
        }

    }

    /* Panel control*/

    function updateUserByAdmin ($user, $changePassword = false) {

        global $conn;

        [
            'user_id' => $id,
            'user_name' => $name,
            'user_surname' => $surname,
            'user_address' => $address,
            'user_email' => $email,
            'user_newPassword' => $newPassword
        ] = $user;

        $hashPassword = generatePasswordHash($newPassword);

        if($changePassword) {
            // Update user whith new password.
            $query = "UPDATE user 
            SET user_name = :name , user_surname = :surname, user_address = :address , user_password = :password, user_email = :email
            WHERE user_id = :id";

            $stmt = $conn -> prepare($query);

            try {
                $status = $stmt -> execute(['name' => $name, 'surname' => $surname, 'address' => $address, 'email' => $email, 'password' => $hashPassword, 'id' => $id]);
            } catch (PDOException $e) {
                return false;
            }            

            return $status;

        } else {
            // Update user without changing password.
            $query = "UPDATE user
            SET user_name = :name , user_surname = :surname, user_address = :address, user_email = :email
            WHERE user_id = :id";

            $stmt = $conn -> prepare($query);
                    
            try {
                $status = $stmt -> execute(['name' => $name, 'surname' => $surname, 'email' => $email, 'address' => $address, 'id' => $id]);
            } catch (PDOException $e) {
                return false;
            }            
            
            return $status;
        }

    }

    function removeBackupRegisterById($registerId) {

        global $conn;

        $query = "DELETE FROM `backupUser` WHERE back_user_id = :id";

        $stmt = $conn -> prepare($query);

        try {
            $status = $stmt -> execute(['id' => $registerId]);
        } catch (PDOException $e) {
            return false;
        }

        return $status;
    }

    function addNewUSer ($user) {

        global $conn;

        [
            'user_name' => $name,
            'user_surname' => $surname,
            'user_email' => $email,
            'user_address' => $address,
            'user_rol' => $rol,
            'user_gender' => $gender,
            'user_password' => $password
        ] = $user;

        $hashPassword = generatePasswordHash($password);

        $query = "INSERT INTO `user` (`user_name`, `user_surname`, `user_gender`, `user_address`, `user_email`, `user_password`, `user_rol`) 
        VALUES (:user_name, :user_surname, :user_gender, :user_address, :user_email, :user_password, :user_rol); ";

        $stmt = $conn -> prepare($query);

        try {
            $status = $stmt -> execute([
                'user_name' => $name, 
                'user_surname' => $surname, 
                'user_gender' => $gender, 
                'user_address' => $address, 
                'user_email' => $email, 
                'user_password' => $hashPassword, 
                'user_rol' => $rol]);
        } catch (PDOException $e) {
            return false;
        }
        return $status;
    }

    function getAllProducts () {
        global $conn;

        $query =  "SELECT product.product_id, product.product_name, product.product_description, product.product_amount, product.product_price, 
                product.product_image, brand.brand_name as product_brand, category.category_name as product_category
            FROM `product` as product 
            INNER JOIN `brand` as brand ON product.product_brand = brand.brand_id
            INNER JOIN `category` as category ON product.product_category = category.category_id
        ";

        try {
            $stmt = $conn -> prepare($query);
            
            $status = $stmt -> execute();

            if ($status) {
                $data = $stmt -> fetchAll();
                return ['status' => 'ok', 'data' => $data];
            }

        } catch (PDOException $e) {
            return ['status' => $status, 'data' => ''];
        }

    }

    function getAllBrands () {
        global $conn;
        
        $query = "SELECT * from brand";

        try {

            $stmt = $conn -> prepare(($query));
            $status = $stmt -> execute();

            if ($status) {
                $data = $stmt -> fetchAll();
                return ['status' => 'ok', 'data' => $data];
            }

        } catch (PDOException $e) {
            return ['status' => '$status', 'data' => ''];
        }

    }

    function getAllCategories () {
        global $conn;
        
        $query = "SELECT * from category";

        try {

            $stmt = $conn -> prepare(($query));
            $status = $stmt -> execute();

            if ($status) {
                $data = $stmt -> fetchAll();
                return ['status' => 'ok', 'data' => $data];
            }

        } catch (PDOException $e) {
            return ['status' => '$status', 'data' => ''];
        }
    }

    function getHistoryProductsData () {

        global $conn;
        
        $query = "SELECT * from backupProducto";

        try {

            $stmt = $conn -> prepare(($query));
            $status = $stmt -> execute();

            if ($status) {
                $data = $stmt -> fetchAll();
                return ['status' => 'ok', 'data' => $data];
            }

        } catch (PDOException $e) {
            return ['status' => '$status', 'data' => ''];
        }        

    }

    function getSales () {

        global $conn;

        $query = "SELECT b.user_name as sale_buyers_name, b.user_email as sale_buyers_email, a.sale_timeStamp, a.sale_totalPrice, a.sale_id 
        FROM `sale` AS a 
        INNER JOIN `user` AS b WHERE a.sale_user = b.user_id";

        try {
            $stmt = $conn -> prepare($query);
            $status = $stmt -> execute();

            if ($status) {
                $data = $stmt -> fetchAll();
                return ['status' => 'ok', 'data' => $data];
            }

        } catch (PDOException $e) {
            return ['status' => '$status', 'data' => ''];
        }      

    }

    function getSaleInformationById ($id) {
        
        global $conn;

        $query = "SELECT a.sale_id as sale_id, b.back_product_name as sale_product_name, a.amount as sale_product_amount, FORMAT((b.back_product_price * a.amount), 2) as sale_product_totalPrice
            FROM `saleInformation` AS a
            INNER JOIN `backupProducto` AS b WHERE b.back_product_id = a.product_id 
            AND a.sale_id = :id";
        
        try {

            $stmt = $conn -> prepare($query);
            $status = $stmt -> execute(['id' => $id]);

            if ($status) {
                $data = $stmt -> fetchAll();
                return ['status' => 'ok', 'data' => $data];
            }

        } catch (PDOException $e) {
            return ['status' => '$status', 'data' => ''];
        }

    }

    function uploadImage ($image) {
        [
            'name' => $name,
            'tmp_name' => $tmpName
        ] = $image;

        if (is_uploaded_file($tmpName)) {
            $dir = "../../../images/";
        
            $fileDestination = $dir . $name;
            $actualDir = getcwd(); // Usar esta
            $status = move_uploaded_file($tmpName, $fileDestination);
        } else {
            return false;
        }

        return $status;
    }

    function addNewProduct ($product) {

        global $conn;

        [
            'product_name' => $name,
            'product_price' => $price,
            'product_amount' => $amount,
            'product_description' => $description,
            'product_category' => $category,
            'product_brand' => $brand,
            'product_image' => $image
        ] = $product;
            
        $queryAddProduct = "INSERT INTO `product` 
        (`product_name`, `product_description`, `product_amount`, `product_price`, `product_brand`, `product_category`, `product_image`) 
        VALUES (:name, :description, :amount, :price, :brand, :category, :image)";

        try {
            $stmt = $conn -> prepare($queryAddProduct);

            $status = $stmt -> execute([
                'name' => $name, 
                'description' => $description, 
                'amount' => $amount, 
                'price' => $price,
                'brand' => $brand,
                'category' => $category,
                'image' => $image 
                ]);
        } catch (PDOException $e) {
            return false;
        }

        return $status;
    }

    function updateProduct ($product, $withImage = false) {

        global $conn;

        [
            'product_name' => $name,
            'product_description' => $description,
            'product_amount' => $amount,
            'product_price' => $price,
            'product_brand' => $brand,
            'product_category' => $category,
            'product_image' => $image,
            'product_id' => $id
        ] = $product;


        if ($withImage) { // Update con foto
            $query = "UPDATE `product` SET 
                `product_name` = :name , 
                `product_description` = :description , 
                `product_amount` = :amount , 
                `product_price` = :price , 
                `product_brand` = :brand , 
                `product_category` = :category , 
                `product_image` = :image 
                WHERE `product_id` = :id ";

            $stmt = $conn -> prepare($query);

            try {
                $status = $stmt -> execute([
                    'name' => $name, 
                    'description' => $description, 
                    'amount' => $amount,
                    'price' => $price,
                    'brand' => $brand,
                    'category' => $category,
                    'image' => $image,
                    'id' => $id]);
                if ($status) {
                    return $status;
                }
            } catch(PDOException $e) {
                return false;
            }

        } else {
            // Update sin foto
            $query = "UPDATE `product` SET 
                `product_name` = :name , 
                `product_description` = :description , 
                `product_amount` = :amount , 
                `product_price` = :price , 
                `product_brand` = :brand , 
                `product_category` = :category
                WHERE `product_id` = :id ";

            $stmt = $conn -> prepare($query);
                    
            try {
                $status = $stmt -> execute([
                    'name' => $name, 
                    'description' => $description, 
                    'amount' => $amount,
                    'price' => $price,
                    'brand' => $brand,
                    'category' => $category,
                    'id' => $id]);
                if ($status) {
                    return $status;
                }
            } catch(PDOException $e) {
                return false;
            }

        }


    }

    function removeProductById ($id) {
        
        global $conn;

        $query = "DELETE FROM product WHERE product_id = :id";

        try {
            $stmt = $conn -> prepare($query);

            $status = $stmt -> execute(['id' => $id]);

            if ($status) {
                return $status;
            }
        } catch (PDOException $e) {
            return false;
        }

    }

?>