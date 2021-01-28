<?php
include "bdd.php";
//if ($_GET['fun']=='addUser'){
////    echo $_GET['nom'], " | ",$_GET['entreprise'], " | ",$_GET['email'], " | ",$_GET['mdp'];
//    $nom = $_GET['nom']; $entreprise = $_GET['entreprise']; $email = $_GET['email']; $passw = $_GET['mdp'];
////    $dbh -> query("INSERT INTO users(nom,entreprise,mail,passw) VALUES (\"$nom\",\"$entreprise\",\"$email\",\"$passw\")");
//    if ($dbh -> query("INSERT INTO users(nom,entreprise,mail,passw) VALUES (\"$nom\",\"$entreprise\",\"$email\",\"$passw\")")){
//        echo "L'utilisateur ",$nom," a été créé";
//    } else echo "Echec";
//}
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
}

