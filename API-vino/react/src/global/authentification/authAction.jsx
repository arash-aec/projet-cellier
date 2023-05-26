export const connexion = (courriel, mot_de_passe) => {
  return {
    type: 'CONNEXION',
    payload: {
      courriel,
      mot_de_passe
    }
  };
};

export const deconnexion = () => {
  return {
    type: 'DECONNEXION',
  };
};