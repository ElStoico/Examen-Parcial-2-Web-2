import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/recipeCard.css';

const RecipeCard = ({ name, image, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="recipe-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="recipe-card-img-container">
        <img src={image} alt={name} className="recipe-card-img" />
      </div>
      <div className="recipe-card-title">{name}</div>
    </div>
  );
};

export default RecipeCard; 