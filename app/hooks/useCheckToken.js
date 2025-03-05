import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useNotLogged = () => {
  const router = useRouter();
  useEffect(() => {
    if (!Cookies.get("token")) {
      router.push("/login");
    }
  }, []);
};

export const useIsLogged = () => {
  const router = useRouter();
  useEffect(() => {
    if (Cookies.get("token")) {
      router.push("/");
    }
  });
};
