    
    <div class="cellier">
        <h1 class="cellier-titre">Mon cellier :</h1>
        <a href="?requete=ajouterNouvelleBouteilleCellier" class="cellier-lien">Ajouter une bouteille</a>
        <div class="cellier-liste">
            <?php
                foreach ($data as $cle => $bouteille) {
            
            ?>
                <div class="bouteille" data-quantite="">
                    <div class="img">
                        
                        <img src="https:<?php echo $bouteille['image'] ?>">
                    </div>
                    <div class="description">
                        <p class="nom"><strong><?php echo $bouteille['nom'] ?></strong></p>
                        <div class="details-bouteille">
                            <div>
                                <p class="millesime">Millesime : <?php echo $bouteille['millesime'] ?></p>
                                <p class="pays">Pays : <?php echo $bouteille['pays'] ?></p>
                                <p class="type">Type : <?php echo $bouteille['type'] ?></p>
                            </div>
                            <div>
                                <p class="prix">Prix : <?php echo $bouteille['prix'] ?></p>
                                <p class="quantite">Quantité : <strong class="quantite-chiffre"><?php echo $bouteille['quantite'] ?></strong></p>
                            </div>
                        </div>
                        <p class="lien-saq"><a href="<?php echo $bouteille['url_saq'] ?>">Voir SAQ</a></p>
                    </div>
                    <div class="options" data-id="<?php echo $bouteille['id_bouteille_cellier'] ?>">
                        <button cl>Modifier</button>
                        <button class='btnAjouter'>Ajouter</button>
                        <button class='btnBoire'>Boire</button>
                        
                    </div>
                </div>
            <?php
                }
            ?>	
        </div>
    </div>


