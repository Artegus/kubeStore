<?php

    include('../utils/functions.php');

    if (isset($_GET['table'])) {

        $table = $_GET['table'];

        if ($table == 'user') {

            ['status' => $status, 'data' => $data] = getUsersData();

            if($status == 'ok') {
                echo json_encode($data);
            } else {
                echo json_encode(['status' => 'error']);
            }
        } elseif ($table == 'historyUser') {

            ['status' => $status, 'data' => $data] = getHistoryUsersData(); 

            if ($status == 'ok') {
                echo json_encode($data);
            } else {
                echo json_encode(['status' => 'error']);
            }

        } elseif ($table == 'product') {
            ['status' => $status, 'data' => $data] = getAllProducts();

            if ($status == 'ok') {
                echo json_encode($data);
            } else {
                echo json_encode(['status' => 'error']);
            }

        } elseif ($table == 'brand') {
            ['status' => $status, 'data' => $data] = getAllBrands();

            if ($status == 'ok') {
                echo json_encode($data);
            } else {
                echo json_encode(['status' => 'error']);
            }
        } elseif ($table == 'category') {
            ['status' => $status, 'data' => $data] = getAllCategories();

            if ($status == 'ok') {
                echo json_encode($data);
            } else {
                echo json_encode(['status' => 'error']);
            }
        } elseif ($table == 'backupProduct') {
            ['status' => $status, 'data' => $data] = getHistoryProductsData();

            if ($status == 'ok') {
                echo json_encode($data);
            } else {
                echo json_encode(['status' => 'error']);
            }
        } elseif ($table == 'sale') {
            ['status' => $status, 'data' => $data] = getSales();

            if ($status == 'ok') {
                echo json_encode($data);
            } else {
                echo json_encode(['status' => 'error']);
            }
        } elseif ($table = 'saleInfo') {

            $saleId = $_GET['sale_id'];

            ['status' => $status, 'data' => $data] = getSaleInformationById($saleId);

            if ($status == 'ok') {
                echo json_encode($data);
            } else {
                echo json_encode(['status' => 'error']);
            }

        }


    }

?>