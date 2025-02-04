import React, { useState } from 'react';
import { useRecipeContext } from '../RecipeContext';


const GetRecipe: React.FC = () => {
  const { handleRecipeShown } = useRecipeContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await handleRecipeShown?.();
    setIsLoading(false);
  };

  return (
    <div className="get-recipe-container">
      {isLoading ? 'Loading...' : (
        <>
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={handleClick} disabled={isLoading}>
            Get a recipe
          </button>
        </>
      )}
    </div>
  )
}

export default GetRecipe