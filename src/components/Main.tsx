'use client'
import React, { useContext } from 'react';
import IngredientsList from './IngredientsList';
import Form from './Form';
import SuggestedRecipe from './SuggestedRecipe';

import { RecipeContext } from '../RecipeContext';


const Main: React.FC = () => {
  const context = useContext(RecipeContext);
  if (!context) throw new Error("Recipe context must be used within RecipeProvider");
  const { ingredients, recipe } = context;

  return (
    <main className='Main'>
      <Form />
      {ingredients.length > 0 && (
        <IngredientsList />
      )}
      {recipe !== null && (
        <SuggestedRecipe />
      )}
    </main>
  )
}

export default Main