
<div class="cellier">
    <div class="cellier-header">
        <h2 class="cellier-titre">Mon cellier</h2>
        <a href="?requete=ajouterNouvelleBouteilleCellier" class="cellier-lien">Ajouter une bouteille</a>
    </div>
    <div class="cellier-liste">
    
        <?php foreach ($data as $cle => $bouteille) { ?>
        <div class="bouteille" data-quantite="">
            <div class="img">
                <img src="<?php echo $bouteille['image'] ?>">
            </div>
            <div class="description">
        <!-- Formulaire de modification d'une bouteille dans le cellier -->   
        <form method="POST" action="?requete=modifierBouteilleCellier&id_bouteille_cellier=<?php echo $bouteille['id_bouteille_cellier'] ?>">
                <h3 class="nom"><?php echo $bouteille['nom'] ?></h3>
                <div class="details-bouteille"> 
                    <div>
                        <p class="millesime">Millesime : <?php echo $bouteille['millesime'] ?></p>
                        <p class="pays">Pays : <?php echo $bouteille['pays'] ?></p>
                        <p class="garde">Garde : <?php echo $bouteille['notes'] ?></p>
                        <p class="type">Type : <?php echo $bouteille['type'] ?></p>
                    </div>
                    <div>
                        <p class="note">Notes : <?php echo $bouteille['garde_jusqua'] ?></p>
                        <p class="prix">Prix : <?php echo $bouteille['prix'] ?></p>
                        <p class="quantite">Quantité : <strong class="quantite-chiffre"><?php echo $bouteille['quantite'] ?></strong></p>
                    </div>
                </div>
                <p><a href="<?php echo $bouteille['url_saq'] ?>">Voir SAQ</a></p>
            </div>
            <div class="options" data-id="<?php echo $bouteille['id_bouteille_cellier'] ?>">
                    <button class='btnModifier' type="submit">Modifier</button>
                    <input type="hidden" name="id_bouteille_cellier" value="<?php echo $bouteille['id_bouteille_cellier'] ?>">
        </form>
                <button class='btnAjouter'>Ajouter</button>
                <button class='btnBoire'>Boire</button>
            </div>
        </div>
        <?php } ?>	
    </div>
</div>

