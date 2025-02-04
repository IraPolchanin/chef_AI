import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown'
import { useRecipeContext } from '../RecipeContext';

const SuggestedRecipe: React.FC = () => {
  const { recipe } = useRecipeContext();
  const recipeSection = useRef<HTMLElement>(null);

  useEffect(() => {
    if (recipe && recipeSection.current) {
      // const yOffset = -window.innerHeight / 4;
      // const element = recipeRef.current;
      // const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      // window.scrollTo({ top: y, behavior: 'smooth' });
       recipeSection.current.scrollIntoView({behavior: "smooth"})
    }
  }, [recipe]);

  if (!recipe) {
    return <div>No recipe available at the moment.</div>;
  }

  return (
    <section ref={recipeSection} className="SuggestedRecipe">
      <h2>Chef Claude Recommends:</h2>
      <article className="suggested-recipe-container" aria-live="polite">
        <ReactMarkdown>
          {recipe}
        </ReactMarkdown>
      </article>
    </section>
  )
}

export default SuggestedRecipe