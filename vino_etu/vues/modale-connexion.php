 <!-- Modale -->
 <div class="modal-overlay-connexion"></div>
            <div class="modal-connexion">
              <span class="close-btn-connexion" >&times;</span>
              <h2>CONNEXION</h2>
              <form>

              <label for="email">Votre courriel:</label>
              <input type="email" id="email" name="email" required>

              <label for="password">Votre mot de passe:</label>
              <input type="password" id="password" name="password" required>

              <input type="submit" value="Submit">
              </form>
          </div>
            </div>
           

            <script>
              const openModalConnexionBtn = document.getElementById("open-modal-connextion-btn");
              const modalOverlayConnexion = document.querySelector(".modal-overlay-connexion");
              const modalConnexion = document.querySelector(".modal-connexion");
              const closeBtnConnexion = document.querySelector(".close-btn-connexion");
              
              openModalConnexionBtn.addEventListener("click", function() {
                modalOverlayConnexion.style.display = "block";
                modalConnexion.style.display = "block";
              });
              
              closeBtnConnexion.addEventListener("click", function() {
                modalOverlayConnexion.style.display = "none";
                modalConnexion.style.display = "none";
              });
            </script>