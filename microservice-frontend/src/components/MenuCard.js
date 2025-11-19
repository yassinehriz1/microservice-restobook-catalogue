// src/components/MenuCard.js

import React from 'react';

const MenuCard = ({ menu, onMenuClick }) => {
  return (
    <div className="menu-card">
      <img 
        src={menu.image} 
        alt={menu.name} 
        className="menu-card-image"
        onClick={() => onMenuClick(menu)}
      />
      <div className="menu-card-content">
        <h3 className="menu-card-title">{menu.name}</h3>
        <p className="menu-card-description">{menu.description}</p>
        <p className="menu-card-price">{menu.price.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default MenuCard;
