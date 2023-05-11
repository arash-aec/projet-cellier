<div class="ajouter">
    <h2>Ajouter une bouteille</h2>
    <!-- Formulaire pour ajouter une nouvelle bouteille -->
    <div class="nouvelleBouteille" vertical layout>
        <label for="nom_bouteille">Recherche : </label> 
        <input type="text" name="nom_bouteille" id="nom_bouteille" class="rechercheListeBouteille">
        <ul class="listeAutoComplete"></ul>
        <!-- Affichage de la bouteille trouvée grâce à l'autocomplétion -->
        <div>
            <label for="nom_bouteille">Nom :</label>
            <strong data-id="" class="nom_bouteille" id="nom_bouteille"></strong>
            <label for="millesime">Millesime : * </label>
            <input name="millesime" id="millesime" required>
            <label for="quantite">Quantite : * </label>
            <input name="quantite" value="1" id="quantite" required>
            <label for="date_achat">Date achat : *</label>
            <input name="date_achat" id="date_achat" required>
            <label for="prix">Prix : * </label>
            <input name="prix" id="prix" required>
            <label for="garde_jusqua">Garde : * </label>
            <input name="garde_jusqua" id="garde_jusqua" required>
            <label for="notes">Notes : * </label>
            <input name="notes" id="notes" required>
            <small>* Champs obligatoires</small>
        </div>
        <!-- Bouton pour ajouter la nouvelle bouteille -->
        <button name="ajouterBouteilleCellier" class="btn-ajouter">Ajouter</button>
        <!-- <button name="ajouterBouteilleCellier" >Ajouter</button> -->
    </div>
</div>
