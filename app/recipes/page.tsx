"use client";
import Cookies from "js-cookie";
import { useCheckToken, useNotLogged } from "../hooks/useCheckToken";
function Recipes() {
  const token = Cookies.get("token");
  useCheckToken();
  useNotLogged();
  console.log("dafadf");

  return (
    <div className="flex min-h-screen items-center justify-center">
      Logging out...
    </div>
  );
}

export default Recipes;
