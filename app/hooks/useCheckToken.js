import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";

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

export const useCheckToken = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  useEffect(() => {
    const check = async (token) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/auth/checktoken`,
          { token }
        );
        return response.data.valid;
      } catch (error) {
        console.log(error);
        return false;
      }
    };

    const validateToken = async () => {
      const isValid = await check(token);
      if (!isValid) {
        Cookies.remove("token");
        router.push("/login");
      }
    };

    validateToken();
  }, []);
};
