<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Connection;
use App\Models\Type;
use App\Models\Pays;
use App\Models\Bouteille;
use stdClass;
use DOMDocument;

class SAQController extends Controller
{
    // Constantes pour le retour de la fonction ajouteProduit()
	const DUPLICATION = 'duplication';
	const ERREURDB = 'erreurdb';
	const INSERE = 'Nouvelle bouteille insérée';

	// Variables pour conserver la page web récupérée et le code HTTP
	private static $_webpage;
	private static $_status;

	// Préparation de la requête SQL pour insérer les produits
	private $stmt;
    private $connection;

	public function __construct(Connection $connection) {
        $this->connection = $connection;
        $this->connection = $connection->getPdo();
        $this->stmt = $this->connection->prepare("INSERT INTO vino__bouteille(nom, type, image, code_saq, pays, description, prix_saq, url_saq, url_img, format) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        if (!$this->stmt) {
            $errorInfo = $this->connection->errorInfo();
            echo "Echec de la préparation : (" . $errorInfo[1] . ") " . $errorInfo[2];
        }
	}
	/**
	 * getProduits
	 * @param int $nombre
	 * @param int $debut
	 */
	public function getProduits($nombre, $page) {
		header('Access-Control-Allow-Origin: http://localhost:5173');

		// Initialisation de la session cURL
		$s = curl_init();
		$url = "https://www.saq.com/fr/produits/vin/vin-rouge?p=".$page."&product_list_limit=".$nombre."&product_list_order=name_asc";
	
		// Configuration des options de cURL pour la requête GET
        curl_setopt_array($s,array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
			// Pour PC : 
			// CURLOPT_CAINFO => 'C:\Program Files\cacert.pem', //une certificat pour pouvoir obtenir des informations de la SAQ
            CURLOPT_USERAGENT=>'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0',
            CURLOPT_ENCODING=>'gzip, deflate',
            CURLOPT_HTTPHEADER=>array(
                    'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language: en-US,en;q=0.5',
                    'Accept-Encoding: gzip, deflate',
                    'Connection: keep-alive',
                    'Upgrade-Insecure-Requests: 1',
					'origin: *'
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

		// Tableau pour stocker les produits à renvoyer en tant que réponse JSON
		$resultats = array();

		foreach ($elements as $key => $noeud) {
		
			// Boucle à travers les éléments li de la page HTML
			// Vérifie si l'élément li contient la classe "product-item" et extrait les informations sur le produit en appelant la fonction "recupereInfo".
			if (strpos($noeud -> getAttribute('class'), "product-item") !== false) {
				
				$info = self::recupereInfo($noeud);
				$retour = $this->ajouteProduit($info);
    
				// Ajouter les données dans le tableau des résultats
				$resultats[] = [
					'nom' => $info->nom,
					'code_retour' => $retour->raison,
					'succes' => $retour->succes,
				];

				if ($retour->succes == false) {
					// Ne pas afficher les détails ici, ils seront inclus dans la réponse JSON
				} else {
					$i++;
				}
			}
		}
		// Envoi de la réponse JSON
		header('Content-Type: application/json');
		echo json_encode($resultats);
	
		// Retourne le nombre de produits qui ont été ajoutés avec succès à la base de données.
		// return $i;
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
            // Pour éviter image tag et avoir l'image de la bouteille
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
    
    private function ajouteProduit($bte)
    {
        $retour = new stdClass();
        $retour->succes = false;
        $retour->raison = '';
    
        // Vérifie si la bouteille existe déjà en se basant sur le code SAQ
        $bouteilleExistante = Bouteille::where('code_saq', $bte->desc->code_SAQ)->exists();
    
        if (!$bouteilleExistante) {
            $prix = number_format(floatval(str_replace(',', '.', $bte->prix)), 2, '.', '');
    
            // Récupère l'instance du modèle Type correspondant
            $type = Type::firstOrCreate(['type' => $bte->desc->type]);
            if (!$type) {
                // Gérer le cas où le type n'existe pas
                $retour->succes = false;
                $retour->raison = self::ERREURDB;
                return $retour;
            }
    
            // Récupère l'instance du modèle Pays correspondant
            $pays = Pays::firstOrCreate(['pays' => $bte->desc->pays]);
            if (!$pays) {
                // Gérer le cas où le pays n'existe pas
                $retour->succes = false;
                $retour->raison = self::ERREURDB;
                return $retour;
            }
    
            // Crée une nouvelle instance de Bouteille avec les données fournies
            $bouteille = new Bouteille();
            $bouteille->nom = $bte->nom;
            $bouteille->type = $type->id;
            $bouteille->image = $bte->img;
            $bouteille->code_saq = $bte->desc->code_SAQ;
            $bouteille->pays = $pays->id;
            $bouteille->description = $bte->desc->texte;
            $bouteille->prix_saq = $prix;
            $bouteille->url_saq = $bte->url;
            $bouteille->url_img = $bte->img;
            $bouteille->format = $bte->desc->format;
    
            // Enregistre la nouvelle bouteille dans la base de données
            $bouteille->save();
    
            $retour->succes = true;
            $retour->raison = self::INSERE;
        } else {
            // Si la bouteille existe déjà, retourne une erreur de duplication
            $retour->succes = false;
            $retour->raison = self::DUPLICATION;
        }
    
        return $retour;
    }
}
