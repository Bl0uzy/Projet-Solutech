<?php
session_start();
$idUser = $_SESSION['id'];
require "bdd.php";

if (isset($_GET['id'])){
    $idWiki = $_GET['id'];
    if ($dbh->query("SELECT * FROM user_wiki_access WHERE user_id=$idUser AND wiki_id=$idWiki")->rowCount() > 0){
        $wiki = $dbh ->query("SELECT * FROM wiki WHERE id = $idWiki")->fetch();
        $decrypted_chaine = openssl_decrypt($wiki['content'], "AES-128-ECB" , $key);

        $content = $decrypted_chaine;
        $titre = $wiki['titre'];
    } else header('Location: user/wiki.php');

} else {
    $content = $_POST['test'];
    $titre = $_POST['titre'];
}

require_once 'assets/dompdf/autoload.inc.php';
use Dompdf\Dompdf;
use Dompdf\Options;


// instantiate and use the dompdf class
$options = new Options();
$options->setIsRemoteEnabled(true);
$dompdf = new Dompdf($options);

$dompdf->loadHtml($content);

// (Optional) Setup the paper size and orientation
$dompdf->setPaper('A4');

// Render the HTML as PDF
$dompdf->render();

// Output the generated PDF to Browser
$dompdf->stream($titre.".pdf", array("Attachment" => false));
?>

