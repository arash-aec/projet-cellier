import React, { useState, useEffect } from "react";

const ImportationSAQ = () => {
  const [page, setPage] = useState(1);
  const [importStatus, setImportStatus] = useState(null);
  const [totalSuccess, setTotalSuccess] = useState(0);

  const importerBouteilles = async (currentPage, callback) => {
    const nombre = 48;
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/importation-saq/${nombre}/${currentPage}`, {
        headers: {
          'Accept': 'application/json',
          'Origin': '*'
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const divSuccess = document.querySelector(".success");
      divSuccess.style.display = "block";
      setImportStatus(data);
      setPage(currentPage);

      callback();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleImportClick = async () => {
    const importPage = async (currentPage) => {
      if (currentPage > 4) {
        setImportStatus(null);
        return;
      }
      await new Promise(resolve => {
        importerBouteilles(currentPage, () => resolve());
      });
  
      await new Promise(resolve => setTimeout(resolve, 1000));
      await importPage(currentPage + 1);
    };
  
    await importPage(1);
  };
  
  useEffect(() => {
    if (importStatus) {
      setTotalSuccess(prevTotalSuccess => prevTotalSuccess + importStatus.filter(result => result.succes).length);
    }
  }, [importStatus]);

  return (
    <>
      <section className="admin-saq">
        <div className="admin-entete">
          <h2>Importer les bouteilles de la SAQ</h2>
          <button className="bouton button-primary" onClick={handleImportClick}>Importer les bouteilles</button>
        </div>
        {importStatus && (
          <div>
            <h3>Résultat de l'importation : </h3>
            <p><strong>Page : {page}</strong></p>
            <p>Nombre d'importations : {importStatus.length}</p>
            <ul>
              {importStatus.map((result, index) => (
                <li key={index}>
                  <p>Nom : {result.nom}</p>
                  <p>Code de retour : {result.code_retour}</p>
                  <p>Succès : {result.succes.toString()}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="success">
          <p>Nombre total d'ajout : <strong>{totalSuccess}</strong></p>
        </div>
      </section>
    </>
  );
};

export default ImportationSAQ;