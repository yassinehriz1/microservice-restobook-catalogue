// src/App.js

import React, { useState, useEffect } from 'react';
import MenuCard from './components/MenuCard';
import MenuModal from './components/MenuModal';
import { menuData } from './data';
import './App.css';

function App() {
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [connectedUser, setConnectedUser] = useState("");

  // Initialiser les données au chargement du composant
useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch("http://catalogue.local/api/products");
	console.log(process.env.BACKEND_URI)
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        setMenus(data);
        setFilteredMenus(data);
      } catch (error) {
        console.error('Erreur lors du fetch des menus:', error);
      }
    };

    fetchMenus();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://catalogue.local/api/current-user");
        if (!res.ok) throw new Error("Impossible de récupérer l'utilisateur");
        const data = await res.json();
        setConnectedUser(data.username || "");
        console.log(connectedUser)
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);


  // Fonction pour gérer le clic sur une carte
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  // Fonction pour fermer la modale
  const closeModal = () => {
    setSelectedMenu(null);
  };

  // Fonction pour gérer le changement de filtre
  const handleFilterChange = (categorie) => {
    setActiveFilter(categorie);
    if (categorie === "Tous") {
      setFilteredMenus(menus);
    } else {
      const newFilteredMenus = menus.filter(menu => menu.category === categorie);
      setFilteredMenus(newFilteredMenus);
    }
  };
  
  // Extraire les catégories uniques pour les boutons de filtre
  const categories = ["Tous", ...new Set(menus.map(menu => menu.category))];

  return (
    <div className="app-container">
      <h1 className="app-title">Catalogue du Resto Book</h1>
      <h1>Test pipeline</h1>
      <div className="filter-container">
        {categories.map(categorie => (
          <button
            key={categorie}
            className={`filter-button ${activeFilter === categorie ? 'active' : ''}`}
            onClick={() => handleFilterChange(categorie)}
          >
            {categorie}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filteredMenus.map(menu => (
          <MenuCard 
            key={menu.id} 
            menu={menu} 
            onMenuClick={handleMenuClick} 
          />
        ))}
      </div>

      <MenuModal 
        menu={selectedMenu} 
        onClose={closeModal} 
      />
    </div>
  );
}

export default App;
