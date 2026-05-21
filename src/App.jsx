import React, { useState, useEffect } from 'react';
import HeroeCard from './complements/HeroeCard';
import './App.css';

function App() {
  const [heroes, setHeroes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    fetch('/heroes.json')
      .then((res) => res.json())
      .then((data) => setHeroes(data))
      .catch((err) => console.error('Error al cargar los héroes:', err));
  }, []);

  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((favId) => favId !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  const heroesFiltrados = heroes.filter((heroe) =>
    heroe.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Súper Héroes</h1> <br />

        
        <input
          type="text"
          className="buscador-input"
          placeholder="Buscar héroe..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </header>
      
      {heroesFiltrados.length === 0 ? (
        <div className="no-resultados">
          <p>No se encontraron héroes</p>
        </div>
      ) : (
        <main className="heroes-grid">
          {heroesFiltrados.map((heroe) => (
            <HeroeCard
              key={heroe.id}
              heroe={heroe}
              isFavorito={favoritos.includes(heroe.id)}
              onToggleFavorito={toggleFavorito}
            />
          ))}
        </main>
      )}
    </div>
  );
}

export default App;

