<?php
$key = "45sdADSD5465dfdsf:$+$**µ";


try {
    $dbh = new PDO('mysql:host=localhost;dbname=solutech', "root", "");
    //    foreach($dbh->query('SELECT * FROM users') as $row) {
//        print_r($row);
//    }
//    $dbh = null;
//    echo "connexion reussi";
} catch (PDOException $e) {
    print "Erreur !: " . $e->getMessage() . "<br/>";
    die();
}