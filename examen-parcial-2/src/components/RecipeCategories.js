import React, { useState, useEffect } from 'react';
import '../styles/recipeCategories.css';

const RecipeCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        setCategories(data.categories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="recipe-categories-loading">Cargando categorías...</div>;
  }

  return (
    <div className="recipe-categories-wrapper">
      <div className="recipe-categories-grid">
        {categories.map((category) => (
          <div key={category.idCategory} className="recipe-category-card">
            <img 
              src={category.strCategoryThumb} 
              alt={category.strCategory} 
              className="recipe-category-thumbnail"
            />
            <h3 className="recipe-category-label">{category.strCategory}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCategories; 