const ValidationBouteilleSAQ = (values) => {
    
    let erreurs = {};

    const prixRegex = /^\d+(\.\d{0,2})?$/;

    if (!values.nom) {
      erreurs.nom = "Nom obligatoire!";
    } 

    if (!values.pays) {
      erreurs.pays = "Pays obligatoire!";
    } 

    if (!values.description) {
      erreurs.description = "Description obligatoire!";
    } 

    if (!values.prix_saq || !prixRegex.test(values.prix_saq)) {
      erreurs.prix_saq = "Le prix est un chiffre avec ou sans décimal";
    }

    if (!values.url_saq) {
      erreurs.url_saq = "URL obligatoire!";
    } 

    if (!values.url_img) {
      erreurs.url_img = "URL obligatoire!";
    } 

    if (!values.format) {
      erreurs.format = "Format obligatoire!";
    }

    if (!values.type) {
      erreurs.type = "Type obligatoire!";
    }
  
    return erreurs;
  };
  
  export default ValidationBouteilleSAQ;