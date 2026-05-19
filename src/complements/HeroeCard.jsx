import React from 'react';
import './HeroeCard.css'; 

const HeroeCard = ({ heroe, isFavorito, onToggleFavorito }) => {
  
  const iniciales = heroe.nombre
    .split('-')
    .join(' ')
    .split(' ')
    .map(palabra => palabra[0])
    .join('')
    .toUpperCase();

  return (
    <div className={`heroe-card ${isFavorito ? 'favorito' : ''}`}>
      
      <div className="heroe-avatar">
        {iniciales}
      </div>
      
      <h3 className="heroe-nombre">{heroe.nombre}</h3>
      <p className="heroe-poder">{heroe.poder}</p>
      <p className="heroe-categoria">{heroe.categoria}</p>
      
      <button 
        type="button"
        className={`btn-favorito ${isFavorito ? 'active' : ''}`}
        onClick={() => onToggleFavorito(heroe.id)}
      >
        {isFavorito ? '♥ Favorito' : '♡ Favorito'}
      </button>
    </div>
  );
};



export default HeroeCard;