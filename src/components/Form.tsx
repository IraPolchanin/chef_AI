import React from 'react';
import { useRecipeContext } from '../RecipeContext';

const Form: React.FC = () => {
  const { handleSubmit } = useRecipeContext();
  return (
    <form
      className='Main__add-ingredient-form'
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder='e.g. oregano'
        aria-label="Add ingredient"
        name='ingredient'
        defaultValue={'meat'}
      />
      <input type="submit" value="+ Add ingredient" />
    </form>
  )
}

export default Form