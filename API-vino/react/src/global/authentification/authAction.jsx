export const connexion = (usagerData) => {
  return {
    type: 'CONNEXION',
    payload: usagerData
  };
};

export const deconnexion = () => {
  return {
    type: 'DECONNEXION',
  };
};