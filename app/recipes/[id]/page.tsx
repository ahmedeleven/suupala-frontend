"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

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

function RecipeDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const token = Cookies.get("token");

  useEffect(() => {
    if (id) {
      const getRecipe = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/recipes/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setRecipe(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      getRecipe();
    }
  }, []);

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="text-2xl text-gray-700 hover:text-gray-300 transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {recipe?.name}
            </h1>
          </div>
        </div>
      </header>

      <div className="mt-8 mb-8 p-4 mx-auto bg-gray-100 rounded-md shadow-md">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
          Ingredients
        </h3>
        <ul className="list-disc list-inside mb-4">
          {recipe?.ingredients.map((item, index) => (
            <li className="text-base font-normal leading-relaxed" key={index}>
              {item}
            </li>
          ))}
        </ul>
        <h3 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 mb-2">
          Instructions
        </h3>
        <ol className="list-decimal list-inside">
          {recipe?.instructions.map((item, index) => (
            <li className="text-base font-normal leading-relaxed" key={index}>
              {item}
            </li>
          ))}
        </ol>
        <h3 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 mb-2">
          Difficulty
        </h3>
        <p>{recipe?.difficulty}</p>
        <h3 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 mb-2">
          Preparation Time
        </h3>
        <p className="pt-0">{recipe?.prepTime}</p>
      </div>
    </>
  );
}

export default RecipeDetail;
