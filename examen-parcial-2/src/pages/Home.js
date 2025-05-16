import React from 'react';
import '../styles/home.css';
import RecipeCategories from '../components/RecipeCategories';
import ramenImg from '../images/ramen.png';

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
            src={ramenImg} 
            alt="Banner principal" 
            className="banner-image"
          />
        </div>
        <div className="banner-right">
          <div className="banner-header-row">
            <span className="chef-hat-icon">🍳</span>
            <span className="banner-homechef">HomeChef</span>
          </div>
          <div className="banner-titles">
            <div className="banner-title-row">
              <h1 className="banner-title-left">Chefs</h1>
              <div className="banner-title-right">
                <span className="yellow-dot" />
                <span className="banner-new-recipe">New recipe for you to try out, let's cook!</span>
              </div>
            </div>
            <div className="banner-title-row">
              <div className="banner-title-spacer" />
              <h1 className="banner-title-right-title">Academy</h1>
            </div>
            <div className="banner-title-row">
              <h1 className="banner-title-left">Secrets</h1>
              <div className="banner-title-spacer" />
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="categories-column">
          <h2 className="section-title">Categorías de Recetas</h2>
          <RecipeCategories />
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