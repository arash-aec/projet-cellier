import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const Admin = () => {

    const estConnecte = useSelector(state => state.auth.estConnecte);
    const navigate = useNavigate();

    let role = null;
    const usagerData = localStorage.getItem('usagerData');
    if (usagerData) {
      const parsedData = JSON.parse(usagerData);
      role = parsedData.role_usager;
    }

  return (
    <>
      { estConnecte && role === 2 ? (
        <div><p>Admin</p></div>
      ) : ( navigate("/") ) }
    </>
  )
}
export default Admin
