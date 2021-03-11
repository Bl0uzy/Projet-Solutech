<?php

require_once 'assets/dompdf/autoload.inc.php';
use Dompdf\Dompdf;
use Dompdf\Options;


// instantiate and use the dompdf class
$options = new Options();
$options->setIsRemoteEnabled(true);
$dompdf = new Dompdf($options);


$dompdf->loadHtml($_POST['test']);

// (Optional) Setup the paper size and orientation
$dompdf->setPaper('A4');

// Render the HTML as PDF
$dompdf->render();

// Output the generated PDF to Browser
$dompdf->stream($_POST['titre'].".pdf", array("Attachment" => false));

