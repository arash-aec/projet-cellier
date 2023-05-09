

<?php
$bouteille = mysqli_fetch_assoc($donnees["bouteille"]);


?>
<div class="modifier">
<div class="nouvelleBouteille" vertical layout>
    <ul class="listeAutoComplete">
    </ul>
    <form method="POST" action="?requete=updateBouteilleCellier">


        <div>
            <h3 class="nom"><?php echo $bouteille['nom'] ?></h3>
            <p>Date achat : <input name="date_achat"  value="<?php echo $bouteille['date_achat'] ?>"></p>
            <p>Grade : <input name="garde" value="<?php echo $bouteille['garde_jusqua'] ?>"></p>
            <p>Notes : <input name="notes" value="<?php echo $bouteille['notes'] ?>"></p>
            <p>Prix : <input name="prix" value="<?php echo $bouteille['prix'] ?>"></p>
            <p>Quantite : <input name="quantite" value="<?php echo $bouteille['quantite'] ?>"></p>
            <p>Millesime : <input name="millesime" value="<?php echo $bouteille['millesime'] ?>"></p>
            <input type="hidden" name="id_bouteille_cellier" value="<?php echo $bouteille['id_bouteille_cellier'] ?>">
            <input type="hidden" name="id_bouteille" value="<?php echo $bouteille['id_bouteille'] ?>">
            <input type="hidden"  value="modifierBouteilleCellier"/>
            <input type="hidden" name="modifierBouteilleCellier" value="modifierBouteilleCellier"/>
        </div>
                <input type="submit" name="updateBouteilleCellier" value="Submit"> 

      
    </form>
</div>
</div> 



