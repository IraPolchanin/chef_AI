import { HfInference } from '@huggingface/inference'
import { Ingredient } from './types/Ingredient';

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
if (!API_KEY) {
  console.error('Hugging Face API key is not set in environment variables');
}

const hf = new HfInference(API_KEY);

export async function getRecipeFromMistral(ingredientsArr: Ingredient[]) {
  if (!API_KEY) {
    throw new Error('Hugging Face API key is not configured');
  }
  const ingredientsString = ingredientsArr.join(", ")
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
      ],
      max_tokens: 1024,
    })
    if (!response?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from Hugging Face API');
    }
    return response.choices[0].message.content
  } catch (err) {
    if (err instanceof Error) {
      console.error('Recipe generation error:', err.message);
      throw err;
    } else {
      console.error('Unknown error during recipe generation:', err);
      throw new Error('Failed to generate recipe');
    }
  }
}