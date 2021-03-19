<?php
require "bdd.php";

if (isset($_GET['fun'])){
    switch ($_GET['fun']){
        case 'addUser':
            $nom = $_GET['nom']; $entreprise = $_GET['entreprise']; $email = $_GET['email']; $passw = password_hash($_GET['mdp'],PASSWORD_DEFAULT);
            if ($dbh -> query("INSERT INTO users(nom,entreprise,mail,passw) VALUES (\"$nom\",\"$entreprise\",\"$email\",\"$passw\")")){
                echo "L'utilisateur ",$nom," a été créé";
            } else echo "Echec";
            break;

        case 'modifUser':
            $id=$_GET['id'];$nom = $_GET['nom']; $entreprise = $_GET['entreprise']; $email = $_GET['email']; $passw = password_hash($_GET['mdp'],PASSWORD_DEFAULT);
            if ($passw == ""){
                if ($dbh ->query("UPDATE users SET nom=\"$nom\", entreprise=\"$entreprise\", mail=\"$email\" WHERE id = \"$id\"")){
                    echo "Modification effectuée";
                } else "Echec";
            } else {
                if ($dbh ->query("UPDATE users SET nom=\"$nom\", entreprise=\"$entreprise\", mail=\"$email\", passw=\"$passw\" WHERE id = \"$id\"")){
                    echo "Modification effectuée";
                } else "Echec";
            }
            break;

        case 'delUser':
            $id = $_GET['id'];
            if ($dbh->query("DELETE FROM users WHERE id=\"$id\"")){
                echo "ok";
            } else echo "fail";
            break;

        case 'updateStatut':
            $id=$_GET['id']; $statut=$_GET['statut'];
            if ($dbh->query("UPDATE tickets SET Statut = \"".$statut."\" WHERE id=\"".$id."\""))
                echo "ok";
            else echo "fail";

            break;

        case 'getTickets':
            $id = $_GET['id'];
            foreach ($dbh->query("SELECT * FROM tickets WHERE Client = \"".$id."\"") as $ticket){
                echo "<option value='".$ticket['id']."'>".$ticket['Sujet']."</option>";
            }

            break;

        case 'delMail':
//            echo $_GET['mailId'];
            $dbh->query("DELETE FROM mailsupport WHERE id = \"".$_GET['mailId']."\"");

            break;

        case 'createTicket':
            $date = date("Y-m-d");
            $derniereModif = date("Y-m-d H:i:s");
            $statut = "Nouveau";

            $dbh->query("INSERT INTO tickets (Sujet, Client, Statut, DateCreation, derniereModif, nouveauMessage) VALUES (\"".$_GET['sujet']."\",\"".$_GET['client']."\",\"".$statut."\",\"".$date."\",\"".$derniereModif."\",\"1\")");
            echo $dbh->lastInsertId();

            break;

        case 'delWiki':
            $wikiId = $_GET['id'];
            $path = "./piecesJointes/".$wikiId."/";
//            print_r($dbh->query("DELETE FROM user_wiki_access WHERE wiki_id = \"".$wikiId."\""));

            if (is_dir($path)){
                $scandir = scandir($path);
                foreach($scandir as $fichier){
                    if ($fichier != ".." && $fichier!="."){
                        echo unlink($path.$fichier);
                    }
                }
                if (rmdir($path)){
                    $dbh -> query("DELETE FROM wiki WHERE id = \"".$wikiId."\"");
                } else echo "echec";
            } else{
                $dbh -> query("DELETE FROM wiki WHERE id = \"".$wikiId."\"");
            }


            break;

        case 'ajoutUserToWiki':
            $userId = $_GET['userID'];
            $wikiId = $_GET['id'];

            $dbh->query("INSERT INTO user_wiki_access (user_id, wiki_id) VALUES (\"".$userId."\",\"".$wikiId."\")");

            break;

        case 'displayUsers':
            $wikiId = $_GET['id'];
            foreach ($dbh->query("SELECT * FROM user_wiki_access WHERE wiki_id=\"".$wikiId."\"") as $wikiAccess){
                $user = $dbh->query("SELECT * FROM users WHERE id = \"".$wikiAccess['user_id']."\"")->fetch();
                echo "<div id='".$user['id']."' class='user'>".$user['nom']." | ".$user['entreprise']."  <span title=\"Supprimer l'utilisateur\">&times;</span></div>";
            }

            break;

        case 'delUserAccessToWiki':
            $userID = $_GET['userID'];
            $wikiId = $_GET['id'];
            $dbh->query("DELETE FROM user_wiki_access WHERE user_id=\"".$userID."\" AND wiki_id=\"".$wikiId."\"");

            break;

        case 'displayFiles':
            if (isset($_GET['ticket'])){
                $relativPath = "./piecesJointesTickets/".$_GET['id']."/";
            } else $relativPath = "./piecesJointes/".$_GET['id']."/";

            if (is_dir($relativPath)){
                $scandir = scandir($relativPath);

                foreach($scandir as $fichier){
                    if ($fichier != ".." && $fichier!="."){
//                        $absolutPath = realpath($relativPath.$fichier);
                        $uri_parts = explode('?', $_SERVER['REQUEST_URI'], 2);
                        $absolutPath = substr('http://' . $_SERVER['HTTP_HOST'] . $uri_parts[0],0,-9).substr($relativPath,1).$fichier;
                        echo "<a href='$absolutPath' title='Télécharger le fichier' download='$fichier'>$fichier</a><img data-toggle='popover' data-content='Lien copié !' class='copyLink' src=\"assets/img/icons/link.svg\"  width='15px'><img class='delFile' src=\"assets/img/icons/rubbish.svg\"><br/>";
                    }
                }
            }

            break;

        case 'displayFilesTicket':
            $relativPath = "./piecesJointesTickets/".$_GET['id']."/";

            if (is_dir($relativPath)){
                $scandir = scandir($relativPath);

                foreach($scandir as $fichier){
                    if ($fichier != ".." && $fichier!="."){
                        $path = "file.php?path=".$_GET['id']."/".$fichier;
                        echo "<a href='$path' title='Télécharger le fichier' download='$fichier'>$fichier</a><img data-toggle='popover' data-content='Lien copié !' class='copyLink' src=\"assets/img/icons/link.svg\"  width='15px'><img class='delFile' src=\"assets/img/icons/rubbish.svg\"><br/>";
                    }
                }
            }

            break;

        case 'displayFilesTicketUser':
            $relativPath = "./piecesJointesTickets/".$_GET['id']."/";

            if (is_dir($relativPath)){
                $scandir = scandir($relativPath);

                foreach($scandir as $fichier){
                    if ($fichier != ".." && $fichier!="."){
                        $path = "file.php?path=".$_GET['id']."/".$fichier;
                        echo "<a href='$path' title='Télécharger le fichier' download='$fichier'>$fichier</a><img data-toggle='popover' data-content='Lien copié !' class='copyLink' src=\"../assets/img/icons/link.svg\"  width='15px'><br/>";
                    }
                }
            }

            break;

        case 'delFile':
            $filePath = $_GET['path'];
            unlink($filePath);

            break;

        case 'displayFolder':
            foreach ($dbh->query("SELECT * FROM dossier") as $dossier){
                echo "<option value='".$dossier['id']."'>".$dossier['nom']."</option>>";
            }

            break;

        case 'newFolder':
            $nomDossier = $_GET['nom'];
            $dbh->query("INSERT INTO dossier(nom) VALUES (\"".$nomDossier."\")");
            break;

        case 'displayWikiToFolder':
            $idFolder = $_GET['idFolder'];
            echo "<select id='selectAllWiki'>";
            echo "<option value='0'>-- Ajouter un wiki --</option>";
            foreach ($dbh->query("SELECT * FROM wiki WHERE groupe IS NULL") as $wiki){
                echo "<option value='".$wiki['id']."'>".$wiki['titre']."</option>";
            }
            echo "</select><hr>";

            foreach ($dbh->query("SELECT * FROM wiki WHERE groupe=\"".$idFolder."\"")as $wiki){
                echo "<span id='".$wiki['id']."'>".$wiki['titre']."</span><img title='Retirer le wiki du dossier' class='rmvWikiFromFolder' src='assets/img/icons/remove2.svg'>  <hr>";
            }
            break;

        case 'addWikiToFolder':
            $idWiki = $_GET['idWiki'];
            $idFolder = $_GET['idFolder'];
            $dbh->query("UPDATE wiki SET groupe = $idFolder WHERE id = $idWiki");
            foreach ($dbh ->query("SELECT * FROM link_user_dossier WHERE id_dossier=$idFolder") as $link){
                $idUser = $link['id_user'];
                $dbh->query("INSERT INTO user_wiki_access(user_id, wiki_id) VALUES ($idUser,$idWiki)");
            }


            break;

        case 'removeWikiFromFolder':
            $idWiki = $_GET['idWiki'];
            $idFolder = $_GET['idFolder'];

            $dbh->query("DELETE FROM user_wiki_access WHERE wiki_id = $idWiki AND user_id IN (SELECT id_user FROM link_user_dossier WHERE id_dossier=$idFolder)");
            $dbh->query("UPDATE wiki SET groupe = NULL WHERE id = \"".$idWiki."\"");
            break;

        case 'displayUserToFolder':
            $idFolder = $_GET['idFolder'];
            echo "<select id='selectAllUser'>";
            echo "<option value='0'>-- Ajouter un utilisateur --</option>";
            foreach ($dbh->query("SELECT * FROM users WHERE ID NOT IN (SELECT id_user FROM link_user_dossier WHERE id_dossier = \"".$idFolder."\")") as $user){
                echo "<option value='".$user['id']."'>".$user['nom']."</option>";
            }
            echo "</select><hr>";

            foreach ($dbh->query("SELECT * FROM link_user_dossier WHERE id_dossier = $idFolder")as $link){
                $userID = $link['id_user'];
                $user = $dbh->query("SELECT * FROM users WHERE id=$userID")->fetch();
                echo "<span id='".$link['id']."'>".$user['nom']."</span><img title=\"Retirer l'utilisateur du dossier\" class='rmvUserFromFolder' src='assets/img/icons/remove2.svg'>  <hr>";
            }
            break;

        case "addUserToFolder":
            $idFolder = $_GET['idFolder'];
            $idUser = $_GET['idUser'];
            $dbh->query("INSERT INTO link_user_dossier(id_user, id_dossier) VALUES ($idUser,$idFolder)");
            $wikis = $dbh->query("SELECT * FROM wiki WHERE groupe = $idFolder");
            foreach ($wikis as $wiki){
                $idWiki = $wiki['id'];
                $dbh->query("INSERT INTO user_wiki_access(user_id, wiki_id) VALUES ($idUser,$idWiki)");
            }
;
            break;

        case "removeUserFromFolder":
            $idLink = $_GET['idLink'];
            $link = $dbh->query("SELECT * FROM link_user_dossier WHERE id = $idLink")->fetch();
            $idUser=$link['id_user'];
            $idFolder = $link['id_dossier'];
            $wikis = "(SELECT id FROM wiki WHERE groupe = $idFolder)";
            $dbh->query("DELETE FROM user_wiki_access WHERE user_id = $idUser AND wiki_id IN (SELECT id FROM wiki WHERE groupe = $idFolder)");
            $dbh->query("DELETE FROM link_user_dossier WHERE id = $idLink");

            break;

        case "modifDateUser":
            $id = $_GET['id']; $date = $_GET['date'];
            echo $date;
            if ($date ==""){
                $dbh->query("UPDATE users SET date_validitee = NULL WHERE id = $id");
            }else{
                $dbh->query("UPDATE users SET date_validitee = \"$date\" WHERE id = $id");
            }

            break;

        case "removeFolder":
            $idFolder = $_GET['idFolder'];
            foreach ($dbh->query("SELECT * FROM wiki WHERE groupe = $idFolder") as $wiki){
                $idWiki = $wiki['id'];
                $dbh->query("DELETE FROM user_wiki_access WHERE wiki_id = $idWiki AND user_id IN (SELECT id_user FROM link_user_dossier WHERE id_dossier=$idFolder)");
                $dbh->query("UPDATE wiki SET groupe = NULL WHERE id = \"".$idWiki."\"");
            }
            $dbh->query("DELETE FROM link_user_dossier WHERE id_dossier = $idFolder");
            $dbh->query("DELETE FROM dossier WHERE id = $idFolder");

            break;
    }

}

if (isset($_POST['fun'])){
    switch ($_POST['fun']){
        case 'moveMail':
            $idMail = $_POST['mailId'];
            $content = urldecode($_POST['mailContent']);
            $idTicket = $_POST['ticketId'];
            $idUser = $_POST['userId'];
            $date = $dbh ->query("SELECT date FROM mailsupport WHERE id = \"".$idMail."\"")->fetch()['date'];
            $RequestAdd = $dbh ->query("INSERT INTO messagesticket(message,idTicket,idUser,date) VALUES (\"".addslashes(openssl_encrypt($content,"AES-128-ECB",$key))."\",\"".$idTicket."\",\"".$idUser."\",\"".$date."\")");

            if ($RequestAdd){
                $dbh->query("UPDATE tickets SET nouveauMessage = 1,derniereModif= \"".$date."\" WHERE id = \"".$idTicket."\"");
                $dbh->query("DELETE FROM mailsupport WHERE id = \"".$idMail."\"");
            }

            break;

        case 'updateTextWiki':
            $id = $_POST['id'];
            $content = strval($_POST['content']);
            $encryptedText = openssl_encrypt($content,"AES-128-ECB",$key);


            echo $dbh ->query("UPDATE wiki SET content =\"".addslashes($encryptedText)."\" WHERE id  = \"".$id."\"");

            break;
    }

}