import React from 'react';
import '../styles/recipeCard.css';

const RecipeCard = ({ name, image }) => {
  return (
    <div className="recipe-card">
      <div className="recipe-card-img-container">
        <img src={image} alt={name} className="recipe-card-img" />
      </div>
      <div className="recipe-card-title">{name}</div>
    </div>
  );
};

export default RecipeCard; 