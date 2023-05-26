
const initialState = {
    estConnecte: false,
    usager: null,
    token: null,
  };
  
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CONNEXION':
      return {
        ...state,
        estConnecte: true,
        usager: action.payload.courriel
      };
    case 'DECONNEXION':
      return {
        ...state,
        estConnecte: false,
        usager: null,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;