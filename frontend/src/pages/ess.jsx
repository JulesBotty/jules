import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ModifierEnregistrement() {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const navigate = useNavigate();
  const [data, setData] = useState({ nom: '', email: '' });

  // 1. Charger les données au montage du composant
  useEffect(() => {
    axios.get(`https://votre-api.com{id}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error("Erreur :", error));
  }, [id]);

  // 2. Mettre à jour l'état lorsque l'utilisateur tape dans le formulaire
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // 3. Soumettre les modifications à la base de données
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://votre-api.com{id}`, data)
      .then(response => {
        alert("Enregistrement modifié avec succès !");
        navigate('/'); // Retour à la liste après modification
      })
      .catch(error => console.error("Erreur lors de la modification :", error));
  };

  return (
    <div>
      <h2>Modifier l'enregistrement</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input 
            type="text" 
            name="nom" 
            value={data.nom} 
            onChange={handleChange} 
          />
        </label>
        <br />
        <label>
          Email:
          <input 
            type="email" 
            name="email" 
            value={data.email} 
            onChange={handleChange} 
          />
        </label>
        <br />
        <button type="submit">Sauvegarder</button>
      </form>
    </div>
  );
}

export default ModifierEnregistrement;