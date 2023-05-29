import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import ImportationSAQ from "../../composants/ImportationSAQ/ImportationSAQ";

const Admin = () => {

  const estConnecte = useSelector(state => state.auth.estConnecte);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let role = null;
  const usagerData = localStorage.getItem('usagerData');
  if (usagerData) {
    const parsedData = JSON.parse(usagerData);
    role = parsedData.role_usager;
  }
  
  useEffect(() => {
    if (!estConnecte || role !== 2) {
      navigate("/");
    }
  }, [estConnecte]);

  return (
    <>
      <div className="admin">
        <h1>Espace Administration</h1>
        <ImportationSAQ />
      </div>
    </>
  );
};

export default Admin;