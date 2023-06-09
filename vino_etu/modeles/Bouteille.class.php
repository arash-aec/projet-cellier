<?php
/**
 * Class Bouteille
 * Cette classe possède les fonctions de gestion des bouteilles dans le cellier et des bouteilles dans le catalogue complet.
 * 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2019-01-21
 * @license Creative Commons BY-NC 3.0 (Licence Creative Commons Attribution - Pas d’utilisation commerciale 3.0 non transposé)
 * @license http://creativecommons.org/licenses/by-nc/3.0/deed.fr
 * 
 */
class Bouteille extends Modele {
	const TABLE = 'vino__bouteille';
    
	public function getListeBouteille()
	{
		$rows = Array();
		$res = $this->_db->query('Select * from '. self::TABLE);
		if($res->num_rows)
		{
			while($row = $res->fetch_assoc())
			{
				$rows[] = $row;
			}
		}
		
		return $rows;
	}
	
	public function getListeBouteilleCellier()
	{
		
		$rows = Array();
		$requete =	'SELECT 
						c.id as id_bouteille_cellier,
						c.id_bouteille, 
						c.date_achat, 
						c.garde_jusqua, 
						c.notes, 
						c.prix, 
						c.quantite,
						c.millesime, 
						b.id,
						b.nom, 
						b.type, 
						b.image, 
						b.code_saq, 
						b.url_saq, 
						b.pays, 
						b.description,
						t.type,
						p.pays
					from vino__cellier c 
					INNER JOIN vino__bouteille b ON c.id_bouteille = b.id
					INNER JOIN vino__type t ON t.id = b.type
					INNER JOIN vino__pays p ON p.id = b.pays
					'; 


		if(($res = $this->_db->query($requete)) == true)
		{
			if($res->num_rows)
			{
				while($row = $res->fetch_assoc())
				{
					$row['nom'] = trim(utf8_encode($row['nom']));
					$rows[] = $row;
				}
			}
		}
		else 
		{
			throw new Exception("Erreur de requête sur la base de donnée", 1);
			 //$this->_db->error;
		}
		return $rows;
	}
	
	/**
	 * Cette méthode permet de retourner les résultats de recherche pour la fonction d'autocomplete de l'ajout des bouteilles dans le cellier
	 * 
	 * @param string $nom La chaine de caractère à rechercher
	 * @param integer $nb_resultat Le nombre de résultat maximal à retourner.
	 * 
	 * @throws Exception Erreur de requête sur la base de données 
	 * 
	 * @return array id et nom de la bouteille trouvée dans le catalogue
	 */
       
	public function autocomplete($nom, $nb_resultat=10)
	{
		
		$rows = Array();
		$nom = $this->_db->real_escape_string($nom);
		$nom = preg_replace("/\*/","%" , $nom);
		 
		//echo $nom;
		$requete ='SELECT id, nom FROM vino__bouteille where LOWER(nom) like LOWER("%'. $nom .'%") LIMIT 0,'. $nb_resultat; 
		//var_dump($requete);
		if(($res = $this->_db->query($requete)) ==	 true)
		{
			if($res->num_rows)
			{
				while($row = $res->fetch_assoc())
				{
					$row['nom'] = trim(utf8_encode($row['nom']));
					$rows[] = $row;
					
				}
			}
		}
		else 
		{
			throw new Exception("Erreur de requête sur la base de données", 1);
			 
		}
		
		
		//var_dump($rows);
		return $rows;
	}
	
	
	/**
	 * Cette méthode ajoute une ou des bouteilles au cellier
	 * 
	 * @param Array $data Tableau des données représentants la bouteille.
	 * 
	 * @return Boolean Succès ou échec de l'ajout.
	 */
	public function ajouterBouteilleCellier($data)
	{
		//TODO : Valider les données.
		//var_dump($data);	
		
		$requete = "INSERT INTO vino__cellier(id_bouteille,date_achat,garde_jusqua,notes,prix,quantite,millesime) VALUES (".
		"'".$data->id_bouteille."',".
		"'".$data->date_achat."',".
		"'".$data->garde_jusqua."',".
		"'".$data->notes."',".
		"'".$data->prix."',".
		"'".$data->quantite."',".
		"'".$data->millesime."')";

        $res = $this->_db->query($requete);
        
		return $res;
	}
	
	
	/**
	 * Cette méthode change la quantité d'une bouteille en particulier dans le cellier
	 * 
	 * @param int $id id de la bouteille
	 * @param int $nombre Nombre de bouteille a ajouter ou retirer
	 * 
	 * @return Boolean Succès ou échec de l'ajout.
	 */
	public function modifierQuantiteBouteilleCellier($id, $nombre)
	{
		// TODO : Valider les données.
		$requete = "UPDATE vino__cellier SET quantite = GREATEST(quantite + ". $nombre. ", 0) WHERE id = ". $id;
		// echo $requete;
        $res = $this->_db->query($requete);
        
		return $res;
	}

	
	public function getBouteilleCellierParID($id) {
		// Accéder à la variable globale de connexion à la base de données
		global $connexion;
	
		// Construire une requête SQL qui sélectionne les informations sur une bouteille dans une cave à vin en fonction de son identifiant
		$requete ='SELECT 
					c.id as id_bouteille_cellier,
					c.id_bouteille, 
					c.date_achat, 
					c.garde_jusqua, 
					c.notes, 
					c.prix, 
					c.quantite,
					c.millesime, 
					b.id,
					b.nom, 
					b.type, 
					b.image, 
					b.code_saq, 
					b.url_saq, 
					b.pays, 
					b.description,
					t.type,
					p.pays
					from vino__cellier c 
					INNER JOIN vino__bouteille b ON c.id_bouteille = b.id
					INNER JOIN vino__type t ON t.id = b.type
					INNER JOIN vino__pays p ON p.id = b.pays
					WHERE c.id = ?';
	
		// Préparer la requête SQL pour l'exécution en utilisant la variable de connexion à la base de données
		$reqPrep = mysqli_prepare($connexion, $requete);
	
		// Vérifier si la préparation de la requête a réussi
		if($reqPrep)
		{
			// Lier la valeur de l'identifiant de la bouteille au paramètre de la requête préparée
			mysqli_stmt_bind_param($reqPrep, "s", $id);
	
			// Exécuter la requête préparée
			mysqli_stmt_execute($reqPrep);
	
			// Obtenir les résultats de la requête préparée
			$resultats = mysqli_stmt_get_result($reqPrep);
	
			// Retourner les résultats de la requête
			return $resultats;
		}
		else {
			// Si la préparation de la requête a échoué, afficher un message d'erreur et arrêter l'exécution du script
			die("Erreur de requête préparée...");
		}
	}

	
	// Mettre à jour la bouteille en cellier 

	public function updateBouteilleCellier($id_bouteille_cellier, $id_bouteille, $date_achat, $garde_jusqua, $notes, $prix, $quantite, $millesime)
	{
		global $connexion; // Accéder à la variable globale pour la connexion à la base de données
	
		// Préparer la requête SQL avec des espaces réservés pour les paramètres
		$stmt = $connexion->prepare("UPDATE vino__cellier SET id_bouteille = ?, date_achat = ?, garde_jusqua = ?, notes = ?, prix = ?, quantite = ?, millesime = ? WHERE id = ?");
		
		// Lier les paramètres à la requête à l'aide de la méthode bind_param()
		$stmt->bind_param("isssdiii", $id_bouteille, $date_achat, $garde_jusqua, $notes, $prix, $quantite, $millesime, $id_bouteille_cellier);
		
		// Exécuter la requête et stocker le résultat
		$result = $stmt->execute();
	
		// Vérifier si l'exécution a réussi et retourner true ou false en conséquence
		if ($result) {
			return true;
		} else {
			return false;
		}
	}
	
}




?>