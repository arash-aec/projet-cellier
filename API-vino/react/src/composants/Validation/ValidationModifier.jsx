const ValidationModifier = (values) => {
    let erreurs = {};
    const courrielRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nomRegex = /^[a-zA-Z]{2,}$/;
    const prenomRegex = /^[a-zA-Z]{2,}$/;
  
    if (!values.courriel) {
      erreurs.courriel = "Courriel obligatoire!";
    } else if (!courrielRegex.test(values.courriel)) {
      erreurs.courriel = "Courriel non valide!";
    }
  
    if (!values.nom) {
      erreurs.nom = "Nom obligatoire!";
    } else if (!nomRegex.test(values.nom)) {
      erreurs.nom =
        "Le nom doit contenir au moins 2 lettres et ne peut contenir que des lettres.";
    }
  
    if (!values.prenom) {
      erreurs.prenom = "Prenom obligatoire!";
    } else if (!prenomRegex.test(values.prenom)) {
      erreurs.prenom =
        "Le prénom doit contenir au moins 2 lettres et ne peut contenir que des lettres.";
    }
  
    return erreurs;
  };
  
  export default ValidationModifier;
  