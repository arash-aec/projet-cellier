import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './vues/Login';
import Usager from './vues/Usager';
import Inscription from './vues/Inscription';

const AppRouter = () => {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />}  />
      <Route path="/inscription" element={<Inscription />}  />
      <Route path="/usager" element={<Usager />}  />
    </Routes>
  </Router>
  );
};

export default AppRouter;
