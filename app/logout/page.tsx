"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
function Logout() {
  const router = useRouter();
  useEffect(() => {
    Cookies.remove("token");

    router.push("/");
  }, []);
}

export default Logout;
