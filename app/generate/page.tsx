"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNotLogged, useCheckToken } from "../hooks/useCheckToken";

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  difficulty: string;
  prepTime: string;
}

function Generate() {
  useCheckToken();
  useNotLogged();
  const token = Cookies.get("token");
  const [items, setItems] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<string>("");
  const [generatedRecipeObject, setGeneratedRecipeObject] =
    useState<Recipe | null>(null);

  const toggleSelectedItem = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  useEffect(() => {
    const getItems = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/items`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    };

    const fetchItems = async () => {
      const itemsList = await getItems();
      setItems(itemsList);
    };

    fetchItems();
  }, []);

  const generateRecipe = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/recipes/generate`,
        { items: selectedItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      let recipe: string =
        response.data.result.response.candidates[0].content.parts[0].text;

      if (recipe.startsWith("```json")) {
        recipe = recipe.substring(7, recipe.length - 3); // Remove ```json and ```
      }
      //remove leading and trailing whitespace
      recipe = recipe.trim();
      console.log(recipe);
      setGeneratedRecipe(recipe);
      setGeneratedRecipeObject(JSON.parse(recipe));
      return recipe;
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Generate a recipe
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => toggleSelectedItem(item)}
              className={`select-none inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 ${
                selectedItems.includes(item) ? "bg-green-700" : "bg-red-700"
              }`}
            >
              <span className="mr-2">{item}</span>
            </div>
          ))}
          <div className="flex items-center space-x-4">
            <button
              onClick={generateRecipe}
              className="flex  justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Generate
            </button>
            {isLoading ? (
              <>
                <span className="loader"></span>
              </>
            ) : (
              <></>
            )}
          </div>

          {generatedRecipeObject && (
            <>
              <div className="mt-8 p-6 bg-gray-100 rounded-md shadow-md">
                <h3 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
                  {generatedRecipeObject?.name}
                </h3>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
                  Ingredients
                </h3>
                <ul className="list-disc list-inside mb-4">
                  {generatedRecipeObject?.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
                  Instructions
                </h3>
                <ol className="list-decimal list-inside">
                  {generatedRecipeObject?.instructions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </div>
              <button className="flex  justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                Save
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
}
export default Generate;
