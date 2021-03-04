<?php
require "bdd.php";
//if ($_GET['fun']=='addUser'){
////    echo $_GET['nom'], " | ",$_GET['entreprise'], " | ",$_GET['email'], " | ",$_GET['mdp'];
//    $nom = $_GET['nom']; $entreprise = $_GET['entreprise']; $email = $_GET['email']; $passw = $_GET['mdp'];
////    $dbh -> query("INSERT INTO users(nom,entreprise,mail,passw) VALUES (\"$nom\",\"$entreprise\",\"$email\",\"$passw\")");
//    if ($dbh -> query("INSERT INTO users(nom,entreprise,mail,passw) VALUES (\"$nom\",\"$entreprise\",\"$email\",\"$passw\")")){
//        echo "L'utilisateur ",$nom," a été créé";
//    } else echo "Echec";
//}
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
            $dbh->query("DELETE FROM mailsupport WHERE id = \"".$_GET['id']."\"");

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
            print_r($dbh->query("DELETE FROM user_wiki_access WHERE wiki_id = \"".$wikiId."\""));

            $scandir = scandir("./piecesJointes/".$_GET['id']."/");
            foreach($scandir as $fichier){
                if ($fichier != ".." && $fichier!="."){
                    echo unlink($path.$fichier);
                }
            }
            if (rmdir($path)){
                $dbh -> query("DELETE FROM wiki WHERE id = \"".$wikiId."\"");
            } else echo "echec";
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
            $RequestAdd = $dbh ->query("INSERT INTO messagesticket(message,idTicket,idUser,date) VALUES (\"".$content."\",\"".$idTicket."\",\"".$idUser."\",\"".$date."\")");

            if ($RequestAdd){
                $dbh->query("UPDATE tickets SET nouveauMessage = 1,derniereModif= \"".$date."\" WHERE id = \"".$idTicket."\"");
                $dbh->query("DELETE FROM mailsupport WHERE id = \"".$idMail."\"");
            }

            break;

        case 'updateTextWiki':
            $id = $_POST['id'];
            $content = $_POST['content'];
            $dbh ->query("UPDATE wiki SET content =\"".$content."\" WHERE id  = \"".$id."\"");

            break;
    }

}