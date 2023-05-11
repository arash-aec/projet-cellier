<!DOCTYPE html>
<html lang="fr">
	<head>
		<title>VINO</title>

		<meta charset="utf-8">
		<meta http-equiv="cache-control" content="no-cache">
		<meta name="viewport" content="width=device-width, minimum-scale=0.5, initial-scale=1.0, user-scalable=yes">
		<meta name="description" content="Vino : Application de gestion de cellier | Projet Web 2 : Examen final">
		<meta name="author" content="Arash Ashtari | Saman Nazari | Jerome Fosse">
		
		<link rel="stylesheet" href="./assets/css/styles.css" />
		<link rel="stylesheet"href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
		
    <base href="<?php echo BASEURL; ?>">
		
    <script src="./assets/js/plugins.js"></script>
		<script src="./assets/js/main.js"></script>
	</head>

  <body>
    <!-- login bar -->
    <!-- <div class="header-top">
      <div><a href="#">Français</a></div>
      <div>
        <a href="#">SE CONNECTER <i class="fa fa-user-circle-o"></i></a>
      </div>
      <div>
        <a href="#"><i class="fa fa-cart-plus"></i></a>
      </div>
    </div> -->
    <!-- Navigation bar -->
    <header class="header">
      <!-- Logo -->
      <a href="#" class="logo"><img src="assets/img/logo-1.png" alt="logo de Vino"></a>
      <!-- Hamburger icon -->
      <input class="side-menu" type="checkbox" id="side-menu" />
      <label class="hamb" for="side-menu">
        <span class="hamb-line"></span>
      </label>
      <!-- Menu -->
      <nav class="nav">
        <ul class="menu">
          <li><a href="?requete=accueil">Accueil</a></li>
          <li><a href="?requete=afficheListeBouteille">Mon cellier</a></li>
        </ul>
      </nav>
    </header>
    <main>
			