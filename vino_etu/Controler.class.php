<?php
/**
 * Class Controler
 * Gère les requêtes HTTP
 * 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2019-01-21
 * @license Creative Commons BY-NC 3.0 (Licence Creative Commons Attribution - Pas d’utilisation commerciale 3.0 non transposé)
 * @license http://creativecommons.org/licenses/by-nc/3.0/deed.fr
 * 
 */

class Controler 
{
	
		/**
		 * Traite la requête
		 * @return void
		 */
		public function gerer()
		{
			
			switch ($_GET['requete']) {
				case 'listeBouteille':
					$this->listeBouteille();
					break;
				case 'autocompleteBouteille':
					$this->autocompleteBouteille();
					break;
				case 'ajouterNouvelleBouteilleCellier':
					$this->ajouterNouvelleBouteilleCellier();
					break;
				case 'ajouterBouteilleCellier':
					$this->ajouterBouteilleCellier();
					break;
				case 'boireBouteilleCellier':
					$this->boireBouteilleCellier();
					break;
					case 'modifierBouteilleCellier':
						$this->modifierBouteilleCellier();
						break;
						case 'updateBouteilleCellier':
							$this->updateBouteilleCellier();
							break;
				default:
					$this->accueil();
					break;
			}
		}

		private function accueil()
		{
			$bte = new Bouteille();
            $data = $bte->getListeBouteilleCellier();
			include("vues/entete.php");
			include("vues/cellier.php");
			include("vues/pied.php");
                  
		}
		

		private function listeBouteille()
		{
			$bte = new Bouteille();
            $cellier = $bte->getListeBouteilleCellier();
            
            echo json_encode($cellier);
                  
		}
		
		private function autocompleteBouteille()
		{
			$bte = new Bouteille();
			//var_dump(file_get_contents('php://input'));
			$body = json_decode(file_get_contents('php://input'));
			//var_dump($body);
            $listeBouteille = $bte->autocomplete($body->nom);
            
            echo json_encode($listeBouteille);
                  
		}

		private function ajouterNouvelleBouteilleCellier()
		{
			$body = json_decode(file_get_contents('php://input'));
			//var_dump($body);
			if(!empty($body)){
				$bte = new Bouteille();
				//var_dump($_POST['data']);
				
				//var_dump($data);
				$resultat = $bte->ajouterBouteilleCellier($body);
				echo json_encode($resultat);
			}
			else{
				include("vues/entete.php");
				include("vues/ajouter.php");
				include("vues/pied.php");
			}    
		}
		
		private function boireBouteilleCellier()
		{
			$body = json_decode(file_get_contents('php://input'));
			
			$bte = new Bouteille();
			$resultat = $bte->modifierQuantiteBouteilleCellier($body->id, -1);
			echo json_encode($resultat);
		}

		private function ajouterBouteilleCellier()
		{
			$body = json_decode(file_get_contents('php://input'));
			
			$bte = new Bouteille();
			$resultat = $bte->modifierQuantiteBouteilleCellier($body->id, 1);
			echo json_encode($resultat);
		}


		private function modifierBouteilleCellier() {
			if(isset($_POST['id_bouteille_cellier'])) {
				$id_bouteille_cellier = $_POST['id_bouteille_cellier'];
				$bte = new Bouteille();
				$donnees["bouteille"] = $bte->getBouteilleCellierParId($id_bouteille_cellier);
				include("vues/entete.php");
				include("vues/modifier.php");
				include("vues/pied.php");
			}
			else {
				// handle the case where id_bouteille_cellier is not set in the POST data
			}
		}

		
		public function updateBouteilleCellier() {
			$id_bouteille_cellier = $_POST['id_bouteille_cellier'];
			$id_bouteille = $_POST['id_bouteille'];
			$date_achat = $_POST['date_achat'];
			$garde_jusqua = $_POST['garde'];
			$notes = $_POST['notes'];
			$prix = $_POST['prix'];
			$quantite = $_POST['quantite'];
			$millesime = $_POST['millesime'];
			
			$bouteille = new Bouteille();
			$result = $bouteille->updateBouteilleCellier($id_bouteille_cellier, $id_bouteille, $date_achat, $garde_jusqua, $notes, $prix, $quantite, $millesime);
		
			if ($result) {
				echo "The bottle in the cellar was updated successfully.";
			} else {
				echo "There was an error updating the bottle in the cellar.";
			}
			
			header('Location: index.php?accueil');
		}
		
}
?>















