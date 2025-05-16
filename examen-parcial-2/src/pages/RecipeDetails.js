import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/recipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [removedIngredients, setRemovedIngredients] = useState([]);
  const [showRemoved, setShowRemoved] = useState(false);

  // Cargar ingredientes removidos del localStorage al montar
  useEffect(() => {
    const savedRemoved = localStorage.getItem(`removedIngredients_${id}`);
    if (savedRemoved) {
      setRemovedIngredients(JSON.parse(savedRemoved));
    }
  }, [id]);

  useEffect(() => {
    const fetchMeal = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        if (data.meals && data.meals.length > 0) {
          setMeal(data.meals[0]);
          
          // Extraer ingredientes y medidas
          const ingr = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = data.meals[0][`strIngredient${i}`];
            const measure = data.meals[0][`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '') {
              ingr.push({ name: ingredient, measure: measure || '' });
            }
          }

          // Filtrar los ingredientes que ya están en removedIngredients
          const savedRemoved = localStorage.getItem(`removedIngredients_${id}`);
          if (savedRemoved) {
            const removed = JSON.parse(savedRemoved);
            const filteredIngredients = ingr.filter(ing => 
              !removed.some(removedIng => removedIng.name === ing.name)
            );
            setIngredients(filteredIngredients);
          } else {
            setIngredients(ingr);
          }
        }
      } catch (error) {
        setMeal(null);
      }
      setLoading(false);
    };
    fetchMeal();
  }, [id]);

  const handleRemoveIngredient = (index) => {
    const removedIngredient = ingredients[index];
    setIngredients(prev => prev.filter((_, i) => i !== index));
    setRemovedIngredients(prev => {
      const newRemoved = [...prev, removedIngredient];
      localStorage.setItem(`removedIngredients_${id}`, JSON.stringify(newRemoved));
      return newRemoved;
    });
  };

  const handleRestoreIngredient = (index) => {
    const restoredIngredient = removedIngredients[index];
    setRemovedIngredients(prev => {
      const newRemoved = prev.filter((_, i) => i !== index);
      localStorage.setItem(`removedIngredients_${id}`, JSON.stringify(newRemoved));
      return newRemoved;
    });
    setIngredients(prev => [...prev, restoredIngredient]);
  };

  if (loading) {
    return <div className="recipe-details-loading">Cargando detalles...</div>;
  }
  if (!meal) {
    return <div className="recipe-details-error">No se encontró la receta.</div>;
  }

  return (
    <div className="recipe-details-container">
      <div className="recipe-details-header">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-details-img" />
        <div className="recipe-details-info">
          <h1 className="recipe-details-title">{meal.strMeal}</h1>
          <div className="recipe-details-meta">
            <span className="recipe-details-id">ID: {meal.idMeal}</span>
            <span className="recipe-details-category">Categoría: {meal.strCategory}</span>
          </div>
          <div className="recipe-details-links">
            {meal.strYoutube && (
              <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="recipe-details-link">YouTube</a>
            )}
            {meal.strSource && (
              <a href={meal.strSource} target="_blank" rel="noopener noreferrer" className="recipe-details-link">Página Web</a>
            )}
          </div>
        </div>
      </div>
      <div className="recipe-details-body">
        <h2 className="recipe-details-section-title">Instrucciones</h2>
        <p className="recipe-details-instructions">{meal.strInstructions}</p>
        <h2 className="recipe-details-section-title">Ingredientes</h2>
        <ul className="recipe-details-ingredients">
          {ingredients.map((ing, idx) => (
            <li key={idx} className="recipe-details-ingredient">
              <span>{ing.name}{ing.measure ? ` (${ing.measure})` : ''}</span>
              <button className="remove-ingredient-btn" onClick={() => handleRemoveIngredient(idx)} title="Eliminar ingrediente">✕</button>
            </li>
          ))}
        </ul>
        
        {removedIngredients.length > 0 && (
          <div className="removed-ingredients-section">
            <button 
              className="show-removed-btn"
              onClick={() => setShowRemoved(!showRemoved)}
            >
              {showRemoved ? 'Ocultar ingredientes removidos' : 'Mostrar ingredientes removidos'}
            </button>
            
            {showRemoved && (
              <ul className="recipe-details-ingredients removed">
                {removedIngredients.map((ing, idx) => (
                  <li key={idx} className="recipe-details-ingredient">
                    <span>{ing.name}{ing.measure ? ` (${ing.measure})` : ''}</span>
                    <button 
                      className="restore-ingredient-btn" 
                      onClick={() => handleRestoreIngredient(idx)} 
                      title="Restaurar ingrediente"
                    >
                      +
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails; 