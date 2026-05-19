import React, { useState, useEffect } from 'react';
import HeroeCard from './components/HeroeCard';
import './App.css';

function App() {

  const [heroes, setHeroes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    fetch('/heroes.json')
      .then((res) => res.json())
      .then((data) => setHeroes(data))
      .catch((err) => console.error("Error al cargar los héroes:", err));
  }, []);
}

// Función para alternar el estado de favorito
const toggleFavorito = (id) => {
  if (favoritos.includes(id)) {
    // Si ya es favorito, lo removemos del array
    setFavoritos(favoritos.filter(favId => favId !== id));
  } else {
    // Si no es favorito, lo agregamos
    setFavoritos([...favoritos, id]);
  }
};

// Filtrado en tiempo real (Pista: convertimos todo a minúsculas)
const heroesFiltrados = heroes.filter((heroe) =>
  heroe.nombre.toLowerCase().includes(busqueda.toLowerCase())
);

return (
  <div className="app-container">
    <header className="app-header">
      <h1>Superhéroes</h1>

      {/* Input de búsqueda controlado */}
      <input
        type="text"
        className="buscador-input"
        placeholder="Buscar héroe..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </header>
    {/* Renderizado condicional si no hay resultados */}
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

export default App
