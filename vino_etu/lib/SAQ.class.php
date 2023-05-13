<?php
/**
 * Class MonSQL
 * Classe qui génère ma connection à MySQL à travers un singleton
 *
 *
 * @author Jonathan Martel
 * @version 1.0
 *
 *
 *
 */
class SAQ extends Modele {

	// Constantes pour le retour de la fonction ajouteProduit()
	const DUPLICATION = 'duplication';
	const ERREURDB = 'erreurdb';
	const INSERE = 'Nouvelle bouteille insérée';

	// Variables pour conserver la page web récupérée et le code HTTP
	private static $_webpage;
	private static $_status;

	// Préparation de la requête SQL pour insérer les produits
	private $stmt;

	public function __construct() {
		parent::__construct();
		if (!($this -> stmt = $this -> _db -> prepare("INSERT INTO vino__bouteille(nom, type, image, code_saq, pays, description, prix_saq, url_saq, url_img, format) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"))) {
			echo "Echec de la préparation : (" . $mysqli -> errno . ") " . $mysqli -> error;
		}
	}

	/**
	 * getProduits
	 * @param int $nombre
	 * @param int $debut
	 */
	public function getProduits($nombre = 24, $page = 1) {
		// Initialisation de la session cURL
		$s = curl_init();
		$url = "https://www.saq.com/fr/produits/vin/vin-rouge?p=".$page."&product_list_limit=".$nombre."&product_list_order=name_asc";
	
		// Configuration des options de cURL pour la requête GET
        curl_setopt_array($s,array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
			CURLOPT_CAINFO => 'C:\Program Files\cacert.pem', //une certificat pour pouvoir obtenir des informations de la SAQ
            CURLOPT_USERAGENT=>'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0',
            CURLOPT_ENCODING=>'gzip, deflate',
            CURLOPT_HTTPHEADER=>array(
                    'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language: en-US,en;q=0.5',
                    'Accept-Encoding: gzip, deflate',
                    'Connection: keep-alive',
                    'Upgrade-Insecure-Requests: 1',
            ),
    ));

		// Exécution de la requête GET
		// Envoie une requête GET à la page web et récupère le code HTML de la page.
		self::$_webpage = curl_exec($s);
		self::$_status = curl_getinfo($s, CURLINFO_HTTP_CODE);
		curl_close($s);

		// Parsing du code HTML pour récupérer les informations des produits
		// Utilise la classe DOMDocument pour parcourir le code HTML et extraire les informations sur les produits.
		$doc = new DOMDocument();
		$doc -> recover = true;
		$doc -> strictErrorChecking = false;
		@$doc -> loadHTML(self::$_webpage);
		$elements = $doc -> getElementsByTagName("li");
		$i = 0;
		foreach ($elements as $key => $noeud) {
	
		// Boucle à travers les éléments li de la page HTML
    	// Vérifie si l'élément li contient la classe "product-item" et extrait les informations sur le produit en appelant la fonction "recupereInfo".
			if (strpos($noeud -> getAttribute('class'), "product-item") !== false) {

			
				$info = self::recupereInfo($noeud);
				echo "<p>".$info->nom;
				$retour = $this -> ajouteProduit($info);
				echo "<br>Code de retour : " . $retour -> raison . "<br>";
		// Ajoute les informations sur le produit à la base de données et affiche le résultat de l'opération
        // Appelle la fonction "ajouteProduit" pour ajouter les informations sur le produit à une base de données et affiche le résultat de l'opération.
				if ($retour -> succes == false) {
					echo "<pre>";
					var_dump($info);
					echo "</pre>";
					echo "<br>";
				} else {
					$i++;
				}
				echo "</p>";
			}
		}
	
		// Retourne le nombre de produits qui ont été ajoutés avec succès à la base de données.
		return $i;
	}

	private function get_inner_html($node) {
		$innerHTML = '';
		$children = $node -> childNodes;
		foreach ($children as $child) {
			$innerHTML .= $child -> ownerDocument -> saveXML($child);
		}

		return $innerHTML;
	}
	private function nettoyerEspace($chaine)
	{
		// Fonction pour nettoyer les espaces dans une chaîne de caractères
		return preg_replace('/\s+/', ' ',$chaine);
	}
	private function recupereInfo($noeud) {

		// Utilise la classe DOMDocument pour extraire les informations sur le produit à partir de l'élément li.
		$info = new stdClass();
		
		$imgTags = $noeud->getElementsByTagName("img");
		foreach ($imgTags as $img) {
			$src = $img->getAttribute('src');
			if (strpos($src, 'wysiwyg/product_tags') !== false) {
				continue; // Skip this image
			}
			$alt = $img->getAttribute('alt');
			$width = $img->getAttribute('width');
			$height = $img->getAttribute('height');
			$info->img = $src;
		}


		$a_titre = $noeud -> getElementsByTagName("a") -> item(0);
		$info -> url = $a_titre->getAttribute('href');
		
      
        $nom = $noeud -> getElementsByTagName("a")->item(1)->textContent;
    
		$info -> nom = self::nettoyerEspace(trim($nom));
	
		$aElements = $noeud -> getElementsByTagName("strong");
		foreach ($aElements as $node) {
			if ($node -> getAttribute('class') == 'product product-item-identity-format') {
				$info -> desc = new stdClass();
				$info -> desc -> texte = $node -> textContent;
				$info->desc->texte = self::nettoyerEspace($info->desc->texte);
				$aDesc = explode("|", $info->desc->texte); // Type, Format, Pays
				if (count ($aDesc) == 3) {
					
					$info -> desc -> type = trim($aDesc[0]);
					$info -> desc -> format = trim($aDesc[1]);
					$info -> desc -> pays = trim($aDesc[2]);
				}
				
				$info -> desc -> texte = trim($info -> desc -> texte);
			}
		}

		//Code SAQ
		$aElements = $noeud -> getElementsByTagName("div");
		foreach ($aElements as $node) {
			if ($node -> getAttribute('class') == 'saq-code') {
				if(preg_match("/\d+/", $node -> textContent, $aRes))
				{
					$info -> desc -> code_SAQ = trim($aRes[0]);
				}
				
				
				
			}
		}

		$aElements = $noeud -> getElementsByTagName("span");
		foreach ($aElements as $node) {
			if ($node -> getAttribute('class') == 'price') {
				$info -> prix = trim($node -> textContent);
			}
		}
		return $info;
	}

	private function ajouteProduit($bte) {
		$retour = new stdClass();
		$retour -> succes = false;
		$retour -> raison = '';

		// Récupère l'id du type de bouteille correspondant
		$rows = $this -> _db -> query("select id from vino__type where type = '" . $bte -> desc -> type . "'");
		
		if ($rows -> num_rows == 1) {
			$type = $rows -> fetch_assoc();
			// Stocke l'id récupéré dans une variable
			$type = $type['id'];

			$rows = $this -> _db -> query("select id from vino__bouteille where code_saq = '" . $bte -> desc -> code_SAQ . "'");
			if ($rows -> num_rows < 1) {
				$prix = number_format(floatval(str_replace(',', '.', $bte->prix)), 2, '.', '');
				$this -> stmt -> bind_param("sissssssss", $bte -> nom, $type, $bte -> img, $bte -> desc -> code_SAQ, $bte -> desc -> pays, $bte -> desc -> texte, $prix, $bte -> url, $bte -> img, $bte -> desc -> format);
				$retour -> succes = $this -> stmt -> execute();
				$retour -> raison = self::INSERE;
				
			} else {
				// Si la bouteille existe déjà, retourne une erreur de duplication
				$retour -> succes = false;
				$retour -> raison = self::DUPLICATION;
			}
		} else {
			$retour -> succes = false;
			$retour -> raison = self::ERREURDB;

		}
		return $retour;

	}

}
?>