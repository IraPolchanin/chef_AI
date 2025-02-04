import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown'
import { useRecipeContext } from '../RecipeContext';

const SuggestedRecipe: React.FC = () => {
  const { recipe } = useRecipeContext();
  const recipeSection = useRef<HTMLElement>(null);

  useEffect(() => {
    if (recipe && recipeSection.current) {
       recipeSection.current.scrollIntoView({behavior: "smooth"})
    }
  }, [recipe]);

  if (!recipe) {
    return <div>No recipe available at the moment.</div>;
  }

  return (
    <section ref={recipeSection} className="SuggestedRecipe">
      <h2>Chef AI Recommends:</h2>
      <article className="suggested-recipe-container" aria-live="polite">
        <ReactMarkdown>
          {recipe}
        </ReactMarkdown>
      </article>
    </section>
  )
}

export default SuggestedRecipe