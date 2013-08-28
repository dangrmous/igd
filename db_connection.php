<?php
/**
 * Created by JetBrains PhpStorm.
 * User: geoffreyunger
 * Date: 8/12/13
 * Time: 8:36 PM
 * To change this template use File | Settings | File Templates.
 */

//$query = "INSERT INTO drinking VALUES (NULL, 1,'at work',45.523452, -122.67620699999999,NULL)";

function db_connection($query)
{

    //Database info

    $username = 'USERNAME';
    $pass = 'PASSWORD';
    $db_name = 'DATABASE NAME';

    try { //Change dbname variable as needed for test/production
        $dbh = new PDO('mysql:host=127.0.0.1;port=3306;dbname=' . $db_name, $username, $pass);

        //$test = $dbh->query($query);

        $result = array();
        foreach ($dbh->query($query) as $row) {
            array_push($result, $row);
        }
        $dbh = null;
        return $result;
    } catch (PDOException $e) {
        $result = "Error!: " . $e->getMessage();
        return $result;
        die();
    }
}

//db_connection($query);