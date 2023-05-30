const ValidationBouteille = (values) => {
    
    let erreurs = {};

    const millesimeRegex = /^\d{4}$/;
    const quantiteRegex = /^\d+$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const prixRegex = /^\d+(\.\d{0,2})?$/;
    const noteRegex = /^[1-5]$/;
  
    if (!values.millesime) {
      values.millesime = "Millesime obligatoire!";
    } else if (!millesimeRegex.test(values.millesime)) {
      erreurs.millesime = "Le millesime est une année à 4 chiffres";
    }

    if (!values.garde_jusqua) {
      values.garde_jusqua = "La garde obligatoire!";
    } else if (!quantiteRegex.test(values.garde_jusqua)) {
      erreurs.garde_jusqua = "La garde est un nombre de 1 ou 2 chiffres";
    }

    if (!values.quantite) {
      values.quantite = "Quantite obligatoire!";
    } else if (!quantiteRegex.test(values.quantite)) {
      erreurs.quantite = "La quantite est le nombre de bouteille";
    }

    if (!values.date_achat) {
      values.date_achat = "Date obligatoire!";
    } else if (!dateRegex.test(values.date_achat)) {
      erreurs.date_achat = "Le format de la date doit correspondre à aaaa-mm-jj";
    }

    if (!values.notes) {
      values.notes = "Note obligatoire!";
    } else if (!noteRegex.test(values.notes)) {
      erreurs.notes = "La note est un chiffre entre 1 et 5";
    }

    if (!values.prix) {
      values.prix = "Prix obligatoire!";
    } else if (!prixRegex.test(values.prix)) {
      erreurs.prix = "Le prix est un chiffre avec ou sans décimal";
    }
  
    return erreurs;
  };
  
  export default ValidationBouteille;