// src/components/MenuModal.js

import React from 'react';

const MenuModal = ({ menu, onClose }) => {
  if (!menu) {
    return null; // Ne rien afficher si aucun menu n'est sélectionné
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>X</button>
        <img src={menu.image} alt={menu.name} className="modal-image" />
        <h2 className="modal-title">{menu.name}</h2>
        <p className="modal-description">{menu.descriptionLongue}</p>
        <p className="modal-price">{menu.price.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default MenuModal;
