"use client";
import Cookies from "js-cookie";
import { useCheckToken, useNotLogged } from "../hooks/useCheckToken";
import axios from "axios";
import { useEffect, useState } from "react";
interface Recipe {
  _id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  difficulty: string;
  prepTime: string;
  userId: string;
  public: boolean;
  __v: number;
}
function Recipes() {
  const token = Cookies.get("token");
  const [recipes, setRecipes] = useState<Recipe[] | null>();
  useCheckToken();
  useNotLogged();

  useEffect(() => {
    const getRecipes = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/recipes`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data;
    };

    const fetchRecipes = async () => {
      const recipesList = await getRecipes();
      setRecipes(recipesList);
      console.log(recipesList);
    };

    fetchRecipes();
  }, []);

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Recipes
          </h1>
        </div>
      </header>

      <div className="mx-auto mt-8">
        <div className="border-l-2 border-gray-500 pl-8">
          {recipes &&
            recipes.map((recipe, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:justify-between"
                >
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold mb-2">{recipe.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {recipe.ingredients}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Recipes;
