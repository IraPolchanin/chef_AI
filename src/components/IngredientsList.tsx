import React from 'react';
import GetRecipe from './GetRecipe';
import { useRecipeContext } from '../RecipeContext';

const IngredientsList: React.FC = () => {
  const { ingredients } = useRecipeContext();

  return (
    <section className='Ingredients'>
      <h2 className='Ingredients-title'>Ingredients on hand:</h2>
      <ul className='Ingredients-list' aria-live="polite">
        {ingredients.map((ingredient, i) => (
          <li className='Ingredients-item' key={i}>{ingredient}</li>
        ))}
      </ul>
      {ingredients.length > 3 && (
        <GetRecipe />
      )}
    </section>
  )
}

export default IngredientsList