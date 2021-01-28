<?php
include "bdd.php";

if (isset($_POST['mail']) && isset($_POST['pass'])){
    $user= $dbh->query('SELECT id, passw, nom FROM users WHERE mail = "'.$_POST['mail'].'"')->fetch();
    $passwIsCorrect = password_verify($_POST['pass'],$user['passw']);
    if ($passwIsCorrect){
        session_start();
        $_SESSION['id'] = $user['id'];
        $_SESSION['nom'] = $user['nom'];

    }
    if (isset($_SESSION['id']) && $_SESSION['nom']){
        if ($_SESSION['nom'] == "Admin"){
            header('Location: dashboard.php');
        }

    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<title>Login V2</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->	
	<link rel="icon" type="image/png" href="assestsLogin/images/icons/favicon.ico"/>
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="assestsLogin/vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="assestsLogin/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="assestsLogin/fonts/iconic/css/material-design-iconic-font.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="assestsLogin/vendor/animate/animate.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="assestsLogin/vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="assestsLogin/vendor/animsition/css/animsition.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="assestsLogin/vendor/select2/select2.min.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="assestsLogin/vendor/daterangepicker/daterangepicker.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="assestsLogin/css/util.css">
	<link rel="stylesheet" type="text/css" href="assestsLogin/css/main.css">
<!--===============================================================================================-->
</head>
<body>
	
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form method="post" class="login100-form validate-form">
					<span class="login100-form-title p-b-26">
						Bienvenue
					</span>
					<span class="login100-form-title p-b-48">
						<img src="assets/img/logo-bannière.png" width="250px">
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Veuiller saisir votre adresse mail">
						<input class="input100" type="text" name="mail">
						<span class="focus-input100" data-placeholder="Email"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Entrer votre mot de passe">
						<span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
						<input class="input100" type="password" name="pass">
						<span class="focus-input100" data-placeholder="Mot de passe"></span>
					</div>

                    <div class="text-center">
                        <span class="txt1">
                            <?php
                            if (isset($_POST['mail']) && isset($_POST['pass'])){
                                if (!$user){
                                    echo "Mauvais identifiant ou mot de passe !";
                                } else{
                                    if (!$passwIsCorrect){
                                        echo "Mauvais identifiant ou mot de passe !";
                                    }
                                }
                            }

                            ?>
                        </span>
                    </div>


					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn">
								Se connecter
							</button>
						</div>
					</div>

				</form>
			</div>
		</div>
	</div>
	

	<div id="dropDownSelect1"></div>
	
<!--===============================================================================================-->
	<script src="assestsLogin/vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="assestsLogin/vendor/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="assestsLogin/vendor/bootstrap/js/popper.js"></script>
	<script src="assestsLogin/vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="assestsLogin/vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
	<script src="assestsLogin/vendor/daterangepicker/moment.min.js"></script>
	<script src="assestsLogin/vendor/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->
	<script src="assestsLogin/vendor/countdowntime/countdowntime.js"></script>
<!--===============================================================================================-->
	<script src="assestsLogin/js/main.js"></script>

</body>
</html>