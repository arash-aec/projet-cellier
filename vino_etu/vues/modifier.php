
<?php
// Récupération de la bouteille à modifier à partir des données passées en paramètre
$bouteille = mysqli_fetch_assoc($donnees["bouteille"]);
?>

<div class="modifier">
    <h2>Modification</h2> 
    <h3>"<?php echo $bouteille['nom'] ?>"</h3> 
    <div class="nouvelleBouteille" vertical layout>
        <ul class="listeAutoComplete"></ul>
        <form method="POST" action="?requete=updateBouteilleCellier">
            <div>
                <label for="date_achat">Date achat :</label>
                <input name="date_achat" id="date_achat" value="<?php echo $bouteille['date_achat'] ?>">
                <label for="garde">Garde : </label>
                <input name="garde" id="garde" value="<?php echo $bouteille['garde_jusqua'] ?>">
                <label for="notes">Note : </label>
                <input name="notes" id="notes" value="<?php echo $bouteille['notes'] ?>">
                <label for="prix">Prix : </label>
                <input name="prix" id="prix" value="<?php echo $bouteille['prix'] ?>">
                <label for="quantite">Quantité : </label>
                <input name="quantite" id="quantite" value="<?php echo $bouteille['quantite'] ?>">
                <label for="millesime">Millésime : </label>
                <input name="millesime" id="millesime" value="<?php echo $bouteille['millesime'] ?>">
                <input type="hidden" name="id_bouteille_cellier" value="<?php echo $bouteille['id_bouteille_cellier'] ?>">
                <input type="hidden" name="id_bouteille" value="<?php echo $bouteille['id_bouteille'] ?>">
                <input type="hidden"  value="modifierBouteilleCellier"/>
                <input type="hidden" name="modifierBouteilleCellier" value="modifierBouteilleCellier"/>
            </div>
            <input type="submit" name="updateBouteilleCellier" value="Modifier" class="btn"> 
        </form>
    </div>
</div> 



