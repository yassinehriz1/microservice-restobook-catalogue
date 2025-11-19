// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Fichier de style global
import App from './App'; // Importation de votre composant principal
// Crée une racine pour l'application React dans l'élément DOM avec l'id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Affiche le composant App à l'intérieur de cette racine
// React.StrictMode est un outil pour détecter les problèmes potentiels dans l'application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si vous souhaitez commencer à mesurer les performances de votre application,
// passez une fonction pour enregistrer les résultats (par exemple : reportWebVitals(console.log))
// ou envoyez-les à un point de terminaison d'analyse. En savoir plus : https://bit.ly/CRA-vitals

