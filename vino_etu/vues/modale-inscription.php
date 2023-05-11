<!-- Modale -->
<div class="modal-overlay"></div>
  <div class="modal">
    <span class="close-btn" >&times;</span>
    <h2>CRÉER UN COMPTE</h2>
    <form>

    <label for="nom">Votre nom:</label>
    <input type="text" id="nom" name="nom" required>

    <label for="prenom">Votre prenom:</label>
    <input type="text" id="prenom" name="prenom" required>

    <label for="email-inscrir">Votre courriel:</label>
    <input type="email" id="email-inscrir" name="email-inscrir" required>

    <label for="password-inscrir">Mot de passe:</label>
    <input type="password" id="password-inscrir" name="password-inscrir" required>

    <label for="confirmpass">Confirmez mot de passe:</label>
    <input type="password" id="confirmpass" name="password" required>

    <input type="submit" value="Enregistrer">
    </form>
  </div>
</div>
    

<script>
  const openModalBtnInscription = document.getElementById("open-modal-inscription-btn");
  const modalOverlayInscription = document.querySelector(".modal-overlay");
  const modalInscription = document.querySelector(".modal");
  const closeBtnInscription = document.querySelector(".close-btn");
  
  openModalBtnInscription.addEventListener("click", function() {
    modalOverlayInscription.style.display = "block";
    modalInscription.style.display = "block";
  });
  
  closeBtnInscription.addEventListener("click", function() {
    modalOverlayInscription.style.display = "none";
    modalInscription.style.display = "none";
  });
</script>