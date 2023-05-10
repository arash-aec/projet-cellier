<div class="ajouter">
    <h2>Ajouter une bouteille</h2>
    <!-- Formulaire pour ajouter une nouvelle bouteille -->
    <div class="nouvelleBouteille" vertical layout>
        Recherche : <input type="text" name="nom_bouteille">
        <ul class="listeAutoComplete"></ul>
        <!-- Affichage de la bouteille trouvée grâce à l'autocomplétion -->
        <div >
            <p>Nom : <span data-id="" class="nom_bouteille"></span></p>
            <p>Millesime : * <input name="millesime"></p>
            <p>Quantite : * <input name="quantite" value="1"></p>
            <p>Date achat : * <input name="date_achat"></p>
            <p>Prix : * <input name="prix"></p>
            <p>Garde : * <input name="garde_jusqua"></p>
            <p>Notes : * <input name="notes"></p>
        </div>
        <small>* Champs obligatoires</small>
        <!-- Bouton pour ajouter la nouvelle bouteille -->
        <button name="ajouterBouteilleCellier" class="btn">Ajouter</button>
    </div>
</div>
