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

              <label for="email">Votre courriel:</label>
              <input type="email" id="email" name="email" required>

              <label for="password">Mot de passe:</label>
              <input type="password" id="password" name="password" required>

              <label for="confirmpass">Confirmez mot de passe:</label>
              <input type="password" id="confirmpass" name="password" required>

              <input type="submit" value="Submit">
              </form>
          </div>
            </div>
           

            <script>
              const openModalBtn = document.getElementById("open-modal-btn");
              const modalOverlay = document.querySelector(".modal-overlay");
              const modal = document.querySelector(".modal");
              const closeBtn = document.querySelector(".close-btn");
              
              openModalBtn.addEventListener("click", function() {
                modalOverlay.style.display = "block";
                modal.style.display = "block";
              });
              
              closeBtn.addEventListener("click", function() {
                modalOverlay.style.display = "none";
                modal.style.display = "none";
              });
            </script>