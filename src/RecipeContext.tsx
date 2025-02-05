import React, { createContext, useContext, useState } from 'react';
import { Ingredient } from './types/Ingredient';
import { getRecipeFromMistral } from './ai';

export type RecipeContextType = {
  recipe: string | null;
  setRecipe: (recipe: string) => void;
  ingredients: Ingredient[];
  setIngredients: (ingredients: Ingredient[]) => void;
  isLoading?: boolean;
  handleRecipeShown?: () => Promise<void>;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const RecipeContext = createContext<RecipeContextType | null>(null);
type Props = { children: React.ReactNode };

export const RecipeProvider: React.FC<Props> = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipe, setRecipe] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newIngredient = formData.get('ingredient') as Ingredient;
    if (newIngredient.trim() === '' || ingredients.includes(newIngredient)) return;
    setIngredients([...ingredients, newIngredient]);

    const inputElement = e.currentTarget.elements.namedItem('ingredient') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  };

  async function handleRecipeShown() {
    setIsLoading(true);
    if (recipe === null) {
      const response = await getRecipeFromMistral(ingredients);
      if (response !== undefined) {
        setRecipe(response);
        setIsLoading(false);
      }
    } else {
      setRecipe(null);
    }
  }

  return (
    <RecipeContext.Provider
      value={{
        recipe,
        setRecipe,
        ingredients,
        setIngredients,
        handleRecipeShown,
        handleSubmit,
        isLoading,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) throw new Error("Recipe context must be used within RecipeProvider");
  return context;
};