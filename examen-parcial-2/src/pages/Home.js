import React from 'react';
import '../styles/home.css';

const Home = () => {
  // Datos de ejemplo para las categorías
  const categories = [
    { id: 1, name: 'Categoría 1', count: 15 },
    { id: 2, name: 'Categoría 2', count: 8 },
    { id: 3, name: 'Categoría 3', count: 12 },
    { id: 4, name: 'Categoría 4', count: 6 }
  ];

  // Datos de ejemplo para los resultados
  const results = [
    { id: 1, title: 'Resultado 1', description: 'Descripción del resultado 1', category: 'Categoría 1' },
    { id: 2, title: 'Resultado 2', description: 'Descripción del resultado 2', category: 'Categoría 2' },
    { id: 3, title: 'Resultado 3', description: 'Descripción del resultado 3', category: 'Categoría 1' },
    { id: 4, title: 'Resultado 4', description: 'Descripción del resultado 4', category: 'Categoría 3' }
  ];

  return (
    <div className="home-container">
      <div className="banner">
        <div className="banner-left">
          <img 
            src="https://via.placeholder.com/500x400" 
            alt="Banner principal" 
            className="banner-image"
          />
        </div>
        <div className="banner-right">
          <h1 className="banner-title">Bienvenido a Nuestra Plataforma</h1>
          <h2 className="banner-subtitle">Descubre Nuevas Posibilidades</h2>
          <p className="banner-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      <div className="content-section">
        <div className="categories-column">
          <h2 className="section-title">Categorías</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <div key={category.id} className="category-card">
                <h3>{category.name}</h3>
                <p>{category.count} elementos</p>
              </div>
            ))}
          </div>
        </div>

        <div className="results-column">
          <h2 className="section-title">Resultados</h2>
          <div className="results-grid">
            {results.map(result => (
              <div key={result.id} className="result-card">
                <h3>{result.title}</h3>
                <p>{result.description}</p>
                <span className="category-tag">{result.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 