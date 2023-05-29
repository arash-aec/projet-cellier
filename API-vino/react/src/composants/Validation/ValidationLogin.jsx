const ValidationLogin = (values) => {
  let erreurs = {};
  const courrielRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!values.courriel) {
    erreurs.courriel = "Courriel obligatoire!";
  } else if (!courrielRegex.test(values.courriel)) {
    erreurs.courriel = "Courriel non valide!";
  }

  if (!values.mot_de_passe) {
    erreurs.mot_de_passe = "Mot de passe obligatoire!";
  }
 

  return erreurs;
};

export default ValidationLogin;
