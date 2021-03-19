<?php


$target_dir = "piecesJointesTickets/".$_GET['id']."/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
if (!is_dir($target_dir)){
    mkdir($target_dir);
}
if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_dir.$_FILES['file']['name'])) {
    $status = 1;
} else $status = 0;
echo $status

?>