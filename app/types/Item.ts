export type ItemProps = {
    id: string;
    name: string;
    image: string;
    craftable: boolean;
    recipe?: {
      outputCount: number;
      ingredients: {
        id: string;
        count: number;
      }[];
    };
    baseIngredients?: {
      id: string;
      count: number;
    }[];
    baseRecipes?: {
      id: string;
      count: number;
      outputCount: number;
      needed: number;
    }[];
  };