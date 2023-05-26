
import { combineReducers } from 'redux';
import authReducer from './authentification/authReducer';
import routerReducer from '../global/router/routerReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  route: routerReducer,
  // Ajoutez d'autres reducers ici si nécessaire
});

export default rootReducer;