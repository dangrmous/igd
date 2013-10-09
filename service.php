<?php
require_once './db_connection.php';
$config_vars = include '../igd_config.php';

date_default_timezone_set('America/Los_Angeles');
if ($_POST) {
    if ($_POST['action'] == 'getStatus') {


        $query = "select status, comment, latitude, longitude, created from drinking where created=(select max(created) from drinking)";

        $dbResult = db_connection($query);
        $dbResult = $dbResult['values'][0]; //We know the response will be 1 row, so we ditch the array of rows
        echo json_encode($dbResult);

        exit;
    };

    if (($_POST['action'] == 'updateStatus') && ($_POST['password'] != $config_vars['admin_password'])) {
        echo json_encode(array('status'=>false, 'message'=> 'Unauthorized'));
        exit;
    };

    if (($_POST['action'] == 'updateStatus') && ($_POST['password'] == $config_vars['admin_password'])) { //  {
        //var_dump($_POST);

        $result['message'] = "Status updated successfully"; //We start with assumed success and change as needed
        if ($_POST['drinkingRadio'] == '2') {
            $latitude = 45.52923;
            $longitude = -122.60219;
        } else {
            $latitude = $_POST['latitude'];
            $longitude = $_POST['longitude'];
        }
        $comment = $_POST['commentBox'];
        $comment = utf8_encode($comment);
        $status = $_POST['drinkingRadio'];



        if ($_FILES){
            $file_name = $_FILES["postPhoto"]["name"]; //Lets make the image name unique to be on the safe side
            $split_name = explode(".", $file_name); //We need the file extension
            $file_uuid = uniqid() . "." . $split_name['1']; //Tack the file extension back on

        $target_path = __DIR__ . "/assets/" . $file_uuid;

        if(move_uploaded_file($_FILES["postPhoto"]["tmp_name"], $target_path)){
            $result['imageURL'] = 'http://isgeoffdrinking.com/assets/' . $file_name;
            $result['status'] = true;

        }

        else {
            $result['status'] = false;
            $result['message'] =  'Could not move file';
            echo json_encode($result);
            exit;

        }
        }
        $query = "INSERT INTO drinking VALUES (NULL, " . $status . ",'" . $comment . "'," . $latitude . ", " . $longitude . ",NULL)";
                $dbResult = db_connection($query);

        if ($dbResult['status'] == true) {
            $result['status'] = true;
        } elseif ($dbResult['status'] == false) {
            $result['status'] = false;
            $result['message'] = $dbResult['values'];
        }
        echo json_encode($result);
        exit;
    };

    if($_POST['action'] == 'getFBAppID')

        echo json_encode(array("FBAppID"=>$config_vars['fb_app_id']));
}

