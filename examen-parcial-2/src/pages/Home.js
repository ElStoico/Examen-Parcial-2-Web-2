import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import RecipeCategories from '../components/RecipeCategories';
import RecipeCard from '../components/RecipeCard';
import ramenImg from '../images/ramen.png';

const DEFAULT_CATEGORY = 'Dessert';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [meals, setMeals] = useState([]);
  const [loadingMeals, setLoadingMeals] = useState(false);
  const [search, setSearch] = useState('');

  // Cargar los platillos de la categoría por defecto al montar
  useEffect(() => {
    const fetchDefaultMeals = async () => {
      setLoadingMeals(true);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(DEFAULT_CATEGORY)}`);
        const data = await response.json();
        setMeals(data.meals || []);
      } catch (error) {
        setMeals([]);
      }
      setLoadingMeals(false);
    };
    fetchDefaultMeals();
  }, []);

  // Maneja el click en una categoría
  const handleCategoryClick = async (categoryName) => {
    setSelectedCategory(categoryName);
    setLoadingMeals(true);
    setSearch(''); // Limpiar búsqueda al cambiar de categoría
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(categoryName)}`);
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      setMeals([]);
    }
    setLoadingMeals(false);
  };

  // Filtrar platillos por nombre o id
  const filteredMeals = meals.filter(meal => {
    const searchLower = search.toLowerCase();
    return (
      meal.strMeal.toLowerCase().includes(searchLower) ||
      meal.idMeal.toLowerCase().includes(searchLower)
    );
  });

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
          <RecipeCategories onCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} />
        </div>

        <div className="results-column">
          {/* Barra de búsqueda alineada a la izquierda con ícono de lupa en el placeholder */}
          <div className="search-bar-container">
            <input
              type="text"
              className="recipe-search-bar"
              placeholder="🔍 Search recipes and more..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {loadingMeals ? (
            <div className="recipe-categories-loading">Cargando platillos...</div>
          ) : (
            <div className="results-grid">
              {filteredMeals && filteredMeals.length > 0 ? (
                filteredMeals.map(meal => (
                  <RecipeCard key={meal.idMeal} name={meal.strMeal} image={meal.strMealThumb} />
                ))
              ) : (
                <div style={{ color: '#fff', textAlign: 'center', width: '100%' }}>
                  {selectedCategory ? 'No hay platillos para esta categoría.' : 'Selecciona una categoría para ver los platillos.'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home; 