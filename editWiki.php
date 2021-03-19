<!--
=========================================================
* Paper Dashboard 2 - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-2
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
-->
<?php
//require "upload.php"

require "bdd.php";

session_start();
date_default_timezone_set('Europe/Paris');

if (isset($_GET['titre'])){
//    echo 'fdsqfsdqgrerqfdsqfdqfqdfqds';
    $dbh->query("INSERT INTO wiki(titre,date,content) VALUES (\"".$_GET['titre']."\",\"".date('Y-m-d H:i:s')."\",'')");
    header('Location: editWiki.php?id='.$dbh->lastInsertId());
}
if (isset($_GET['id'])){
    $wikiDetails = $dbh->query("SELECT * FROM wiki WHERE id=\"".$_GET['id']."\"");
    if ($wikiDetails -> rowCount() == 0){
        header('Location: wiki.php');
    } else $wikiDetails = $wikiDetails ->fetch();
} else header('Location: wiki.php');

?>
<!doctype html>
<html lang="fr">

<head>
    <meta charset="utf-8" />
    <link rel="apple-touch-icon" sizes="76x76" href="./assets/img/apple-icon.png">
    <link rel="icon" type="image/png" href="./assets/img/favicon.png">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>
        Wiki
    </title>
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
    <!--     Fonts and icons     -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <!-- CSS Files -->
    <link href="./assets/css/bootstrap.min.css" rel="stylesheet" />
    <link href="./assets/css/paper-dashboard.css?v=2.0.1" rel="stylesheet" />

    <link href="assets/dropzone-5.7.0/dist/dropzone.css" rel="stylesheet"/>
    <script src="./assets/dropzone-5.7.0/dist/dropzone.js"></script>


    <!-- CSS Just for demo purpose, don't include it in your project -->
    <!--  <link href="./assets/demo/demo.css" rel="stylesheet" />-->
</head>

<body class="">
<div class="wrapper ">
    <div class="sidebar" data-color="white" data-active-color="danger">
        <div class="logo">
            <!--        <a href="https://www.creative-tim.com" class="simple-text logo-mini">-->
            <!--          &lt;!&ndash; <div class="logo-image-small">-->
            <!--            <img src="./assets/img/logo-small.png">-->
            <!--          </div> &ndash;&gt;-->
            <!--          &lt;!&ndash; <p>CT</p> &ndash;&gt;-->
            <!--        </a>-->
            <a href="https://www.creative-tim.com" class="simple-text logo-normal">
                <div class="logo-image-big">
                    <img src="assets/img/logo-bannière.png">
                </div>
            </a>
        </div>
        <div class="sidebar-wrapper">
            <ul class="nav">
                <li>
                    <a href="dashboard.php">
                        <i class="nc-icon nc-bank"></i>
                        <p>Dashboard</p>
                    </a>
                </li>

                <li>
                    <a href="utilisateur.php">
                        <i class="nc-icon nc-badge"></i>
                        <p>Utilisateurs</p>
                    </a>
                </li>

                <li>
                    <a href="ticket.php">
                        <i class="nc-icon"><img class="icon-menu" src="assets/img/icons/ticket.svg"></i>
                        <p>Tickets</p>
                    </a>
                </li>

                <li class="active ">
                    <a href="wiki.php">
                        <i class="nc-icon nc-zoom-split"></i>
                        <p>Wiki</p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div class="main-panel" style="height: 100vh;">
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
            <div class="container-fluid">
                <div class="navbar-wrapper">
                    <div class="navbar-toggle">
                        <button type="button" class="navbar-toggler">
                            <span class="navbar-toggler-bar bar1"></span>
                            <span class="navbar-toggler-bar bar2"></span>
                            <span class="navbar-toggler-bar bar3"></span>
                        </button>
                    </div>
                    <a class="navbar-brand">Wiki</a><a href="modifWiki.php"></a>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-bar navbar-kebab"></span>
                    <span class="navbar-toggler-bar navbar-kebab"></span>
                    <span class="navbar-toggler-bar navbar-kebab"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navigation">
                    <?php  echo $_SESSION['nom'] ?>
                    <a id="deconnexion" href="index.php?deco="><img id="imgDeco" src="assets/img/icons/power-button.svg" width="30px" alt="Deconnexion" title="Deconnexion"></a>
                </div>
            </div>
        </nav>
        <!-- End Navbar -->


        <!-- Modal pieces jointes-->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Pièces jointes</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="upload-widget" method="post" class="dropzone" name="image">
                        </form>
                        <hr>
                        <p>Affichage des fichiers</p>
                        <div id="allFiles"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal ajout user-->
        <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Utilisateurs</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <select id="allUsers">
                            <option>Ajouter un utilisateur</option>
                            <?php
                            foreach ($dbh->query("SELECT * FROM users") as $user){
                                if ($dbh->query("SELECT * FROM user_wiki_access WHERE user_id =\"".$user['id']."\" AND wiki_id=\"".$_GET['id']."\"")->rowCount()==0){
                                    if ($user['nom'] != "Admin" ) {
                                        echo "<option value='" . $user['id'] . "'>" . $user['nom'] . "</option>";
                                    }
                                }
                            }
                            ?>
                        </select>
                        <div id="utilisateursAjoutes"></div>
                    </div>
                </div>
            </div>
        </div>





        <div class="content">
            <div class="row">
                <div class="col-md-12">
                    <div id="topSideWiki">
                        <input id="titre" type="text" disabled value="<?php echo $wikiDetails['titre']?>">
                        <img id="editUserWiki" title="Ajouter un/des utilisateur(s)" src="assets/img/icons/edit.svg" data-toggle="modal" data-target="#exampleModal2">
<!--                        <button class="btn" data-toggle="modal" data-target="#exampleModal2">Ajouter un/des utilisateur(s)</button>-->
<!--                        <img id="saveChanges" src="assets/img/icons/save.svg" >-->
                        <div title="Enregistrer">
                            <svg id="saveChanges" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g>
                                    <g xmlns="http://www.w3.org/2000/svg">
                                        <path d="M493.254,77.255l-58.508-58.51C422.742,6.742,406.465,0,389.49,0H352v112c0,8.836-7.164,16-16,16H80   c-8.836,0-16-7.164-16-16V0H32C14.328,0,0,14.326,0,32v448c0,17.673,14.328,32,32,32h448c17.672,0,32-14.327,32-32V122.51   C512,105.535,505.258,89.257,493.254,77.255z M448,448H64V256h384V448z" fill="#000000" data-original="#000000" style="" class=""/>
                                        <rect x="224" width="64" height="96" fill="#000000" data-original="#000000" style="" class=""/>
                                    </g>
                                </g>
                            </svg>
                        </div>

                        <img src="assets/img/icons/pdf-file.svg" id="imgPdf">

                        <img id="delWiki" title="Supprimer le wiki" alt="Supprimer le wiki" src="assets/img/icons/rubbish.svg">
<!--                        <button id="delWiki" class="btn">Supprimer </button>-->


                        <img id="imgPieceJointe" data-toggle="modal" data-target="#exampleModal" src="assets/img/icons/attach.svg" width="40px">
                    </div>
                    <div id="textareaWikiContent">
                        <textarea name="editor1" id="editor1" placeholder="Ecriver votre message ici." contenteditable="true" ><?php
                            $decrypted_chaine = openssl_decrypt($wikiDetails['content'], "AES-128-ECB" , $key);
                            echo $decrypted_chaine ?></textarea>
                    </div>


                </div>
            </div>
        </div>

        <footer class="footer" style="position: absolute; bottom: 0; width: -webkit-fill-available;">
            <div class="container-fluid">
                <div class="row">
                    <div class="credits ml-auto">
              <span class="copyright">
                © 2020, made with <i class="fa fa-heart heart"></i> by Creative Tim
              </span>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</div>
<!--   Core JS Files   -->
<script src="./assets/js/core/jquery.min.js"></script>
<script src="./assets/js/core/popper.min.js"></script>
<script src="./assets/js/core/bootstrap.min.js"></script>


<script src="./assets/js/plugins/perfect-scrollbar.jquery.min.js"></script>
<!--  Google Maps Plugin    -->
<!--  <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>-->
<!-- Chart JS -->
<script src="./assets/js/plugins/chartjs.min.js"></script>
<!--  Notifications Plugin    -->
<script src="./assets/js/plugins/bootstrap-notify.js"></script>
<!-- Control Center for Now Ui Dashboard: parallax effects, scripts for the example pages etc -->
<script src="./assets/js/paper-dashboard.js" type="text/javascript"></script>


<script src="ckeditor/ckeditor.js"></script>
<script src="ckeditor/adapters/jquery.js"></script>

<script src="assets/js/editWiki.js"></script>


</body>

</html>
