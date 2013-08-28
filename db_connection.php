<?php
/**
 * Created by JetBrains PhpStorm.
 * User: geoffreyunger
 * Date: 8/12/13
 * Time: 8:36 PM
 * To change this template use File | Settings | File Templates.
 */


function db_connection($query)
{

    //Database info - refactor to be read in by config! TODO

    $username = 'USERNAME';
    $pass = 'PASSWORD';
    $dbname = 'DATABASENAME';

    $result = array();
    $result['values'] = array(); //This contains either the actual data, or an error message on fail
    $result['status'] = true; //Success / failure value
    try { 
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=' . $dbname, $username, $pass);
        }

     catch (PDOException $e) {
        $result['status'] = false;
        $result['values'] = $e->getMessage();
        return $result;
    }

    $data = $dbh->query($query);

    if ($data == false){
        $result['status'] = false;
        $result['values'] = "A database error occurred.";
        return $result;
    }

    if ($data != false){


    foreach ($dbh->query($query) as $row) {
                    array_push($result['values'], $row);
                }
                $result['status'] = true;
                $dbh = null;

                return $result;
}

}
