<?php
require "bdd.php";
session_start();
$chemin = "./piecesJointesTickets/".$_GET['path'];
$sousChemin = substr($chemin,23);
$ticketId = substr($sousChemin,0,strpos($sousChemin,"/"));
$ticket = $dbh->query("SELECT * FROM tickets WHERE id = $ticketId")->fetch();
$idUser = $_SESSION['id'];

if ($idUser == $ticket['Client'] || $_SESSION['nom'] == "Admin"){
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename=' . basename($chemin));
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    header('Pragma: public');
    header('Content-Length: ' . filesize($chemin));

    readfile($chemin);
}

