<?php
// require 'common.php';
require 'class/DbConnection.php';


// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT name, username, MAX(salary) AS maxSalary, COUNT(salary) AS offerCount
FROM students LEFT OUTER JOIN offers ON students.id = offers.studentId
GROUP BY username, name';
$vars = [];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$patients = $stmt->fetchAll();

if(isset($_GET['format']) && $_GET['format']=='csv') {
    header('Content-Type: text/csv');

    echo "Name,Username,MaxSalary,OfferCount\r\n";

    foreach($patients as $o) {
        echo "\""$o['name']."\""','
            .$o['username'].','
            .$o['maxSalary'].','
            .$o['offerCount']."\r\n";
    }
}
else{
    // Step 3: Convert to JSON
$json = json_encode($patients, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
}