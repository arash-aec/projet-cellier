const ValidationInscription = (values) => {
    let erreurs = {};
    const courrielRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nomRegex = /^[a-zA-Z]{2,}$/;
    const prenomRegex = /^[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[@#$%])[A-Za-z\d@#$%]{6,}$/;
  
    if (!values.courriel) {
      erreurs.courriel = "Courriel obligatoire!";
    } else if (!courrielRegex.test(values.courriel)) {
      erreurs.courriel = "Courriel non valide!";
    }
  
    if (!values.mot_de_passe) {
      erreurs.mot_de_passe = "Mot de passe obligatoire!";
    } else if (!passwordRegex.test(values.mot_de_passe)) {
      erreurs.mot_de_passe =
      "Le mot de passe doit avoir 6 caractères et inclure au moins un des symboles suivants: @, #, $, %.";
    }
  
    if (!values.nom) {
      erreurs.nom = "Nom obligatoire!";
    }
   else if (!nomRegex.test(values.nom)) {
      erreurs.nom = "Le nom doit contenir au moins 2 lettres et ne peut contenir que des lettres.";
    }
  
    if (!values.prenom) {
      erreurs.prenom = "Prenom obligatoire!";
    }
   else if (!prenomRegex.test(values.prenom)) {
      erreurs.prenom = "Le prénom doit contenir au moins 2 lettres et ne peut contenir que des lettres.";
    }
  
    if (!values.mot_de_passe_confirmation) {
      erreurs.mot_de_passe_confirmation = "La confirmation du mot de passe obligatoire.";
    }
  
    return erreurs;
  };
  
  export default ValidationInscription;
  