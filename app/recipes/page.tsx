"use client";
import Cookies from "js-cookie";
import { useCheckToken, useNotLogged } from "../hooks/useCheckToken";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

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

  const deleteRecipe = async (recipeId: string) => {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/recipes/${recipeId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200) {
      setRecipes(recipes?.filter((recipe) => recipe._id !== recipeId));
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Recipes
          </h1>
        </div>
      </header>

      <main>
        <div className=" mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="space-y-4 mx-auto">
            {recipes &&
              recipes.map((recipe, index) => {
                return (
                  <Link
                    key={recipe._id}
                    href={`/recipes/${recipe._id}`}
                    passHref
                    className="p-4"
                  >
                    <div className="relative p-4 bg-gray-100 border border-gray-200 rounded-md hover:bg-red-200">
                      <h3 className="text-lg font-semibold mb-1">
                        {recipe.name}
                      </h3>
                      <p className="text-gray-600">
                        {recipe.ingredients.map((item, index) =>
                          index === recipe.ingredients.length - 1
                            ? item
                            : `${item}, `
                        )}
                      </p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteRecipe(recipe._id);
                        }}
                        className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
                      >
                        <svg
                          fill="currentColor"
                          height="15px"
                          width="15px"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 457.503 457.503"
                          xmlSpace="preserve"
                          className="w-4 h-4"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <g>
                              <g>
                                <path d="M381.575,57.067h-90.231C288.404,25.111,261.461,0,228.752,0C196.043,0,169.1,25.111,166.16,57.067H75.929 c-26.667,0-48.362,21.695-48.362,48.362c0,26.018,20.655,47.292,46.427,48.313v246.694c0,31.467,25.6,57.067,57.067,57.067 h195.381c31.467,0,57.067-25.6,57.067-57.067V153.741c25.772-1.02,46.427-22.294,46.427-48.313 C429.936,78.761,408.242,57.067,381.575,57.067z M165.841,376.817c0,8.013-6.496,14.509-14.508,14.509 c-8.013,0-14.508-6.496-14.508-14.509V186.113c0-8.013,6.496-14.508,14.508-14.508c8.013,0,14.508,6.496,14.508,14.508V376.817z M243.26,376.817c0,8.013-6.496,14.509-14.508,14.509c-8.013,0-14.508-6.496-14.508-14.509V186.113 c0-8.013,6.496-14.508,14.508-14.508c8.013,0,14.508,6.496,14.508,14.508V376.817z M320.679,376.817 c0,8.013-6.496,14.509-14.508,14.509c-8.013,0-14.509-6.496-14.509-14.509V186.113c0-8.013,6.496-14.508,14.509-14.508 s14.508,6.496,14.508,14.508V376.817z"></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </button>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </main>
    </>
  );
}

export default Recipes;
