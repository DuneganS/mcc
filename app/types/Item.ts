export interface ItemProps {
  id: string;
  name: string;
  craftable: boolean;
  image: string;
  recipeOutput: number;
  recipeIngredients: string[];
  recipeIngredientAmounts: { id: string; amount: number }[];
}
