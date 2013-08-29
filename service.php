<?php

require_once './db_connection.php';
$config_vars = include '../igd_config.php';

date_default_timezone_set('America/Los_Angeles');
if ($_POST) {
    if ($_POST['action'] == 'getStatus') {


        $query = "select status, comment, latitude, longitude, created from drinking where created=(select max(created) from drinking)";

        $result = db_connection($query);
        $result = $result['values'][0]; //We know the response will be 1 row, so we ditch the array of rows
        echo json_encode($result);

        exit;
    };

    if (($_POST['action'] == 'updateStatus') && ($_POST['password'] != "3141")) {
        fail("Unauthorized");
        exit;
    };

    if (($_POST['action'] == 'updateStatus') && ($_POST['password'] == "3141")) { //  {
        //var_dump($_POST);
        if ($_POST['status'] == '2') {
            $latitude = 45.52923;
            $longitude = -122.60219;
        } else {
            $latitude = $_POST['latitude'];
            $longitude = $_POST['longitude'];
        }
        $comment = $_POST['comment'];
        $comment = utf8_encode($comment);
        $status = $_POST['status'];
        $query = "INSERT INTO drinking VALUES (NULL, " . $status . ",'" . $comment . "'," . $latitude . ", " . $longitude . ",NULL)";
        $result = db_connection($query);

        if ($result['status'] == true) {
            success("Status updated successfully");
        } elseif ($result['status'] == false) {
            fail($result['values']);
        }
        exit;
    };

    if($_POST['action'] == 'getFBAppID')

        echo json_encode(array("FBAppID"=>$config_vars['fb_app_id']));
}

function fail($message)
{
    echo(json_encode(array('status' => 'fail', 'message' => $message)));
    exit;
}

function success($message)
{
    echo(json_encode(array('status' => 'success', 'message' => $message)));
    exit;
}

