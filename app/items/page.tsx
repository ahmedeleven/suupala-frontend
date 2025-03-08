"use client";
import { useEffect, useState } from "react";
import { useNotLogged, useCheckToken } from "../hooks/useCheckToken";
import axios from "axios";
import Cookies from "js-cookie";

function Items() {
  const [items, setItems] = useState<string[]>([]);
  const [item, setItem] = useState("");
  const token = Cookies.get("token");

  useCheckToken();
  useNotLogged();

  const addItem = async (itemName: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/items`,
        { item: itemName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setItems([...items, itemName]);
      setItem("");
      //console.log(response);
      return response;
    } catch (error) {
      //console.error(error);
      return error;
    }
  };

  const removeItem = async (item: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user/items`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { item },
        }
      );
      setItems(items.filter((i) => i !== item));
      console.log(response);
    } catch (error) {
      console.error(error);
      return error;
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
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Items
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="item"
              id="item"
              autoComplete="off"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addItem(item);
                }
              }}
              required
              className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
            />
            <button
              onClick={() => addItem(item)}
              className="rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600"
            >
              Add
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="inline-flex items-center rounded-full bg-red-700 px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
            >
              <span className="mr-2">{item}</span>
              <button
                onClick={() => removeItem(item)}
                className="text-white hover:text-gray-800 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Items;
