<?php
/**
 * Created by JetBrains PhpStorm.
 * User: geoffreyunger
 * Date: 8/12/13
 * Time: 8:39 PM
 * To change this template use File | Settings | File Templates.
 */

require_once 'db_connection.php';

$currentTime = new DateTime();
$readableTime = $currentTime->format('Y-m-d H:i:s');
$currentTime = $currentTime->format('U');

echo "Running db updater at " . $readableTime . "\n";

$query = "select status, comment, latitude, longitude, created from drinking where created=(select max(created) from drinking)";
$result = db_connection($query);

if (!($result)) echo "Db connection failed.\n";

$result = $result[0];


$lastUpdateTime = new DateTime($result['created']);
$lastUpdateTimeReadable = $lastUpdateTime->format('Y-m-d H:i:s');
$lastUpdateTime = $lastUpdateTime->format('U');

echo "Last update on DB was at: " . $lastUpdateTimeReadable . "\n";

if($currentTime > ($lastUpdateTime + 7200)){

    $query = "update drinking set status = 0";
    $result = db_connection($query);
    //echo $result . "\n";
    echo "You've been drinking for 2 hours! Set status to 0\n";

}

else {

    echo "You haven't been drinking that long. Doing nothing\n";
}

echo "- - - - - - - - - - - - - - - - - -\n";




