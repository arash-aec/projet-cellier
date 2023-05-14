import React from 'react';
import ReactDOM from 'react-dom';
import Accueil from '../Accueil/accueil';

const Main = () => {
  return (
    <div id='main'>
     <Accueil />
    </div>
  );
};

ReactDOM.render(<Main />, document.getElementById('main'));
