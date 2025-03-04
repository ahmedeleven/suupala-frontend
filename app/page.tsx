"use client";
import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const token = Cookies.get("token");
  const [username, setUsername] = useState("");

  const getUserProfile = async () => {
    try {
      const userData = await axios.get(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return userData;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getUserProfile().then((data: any) => {
      setUsername(data?.data?.user?.username ?? "");
    });
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Image
          src={"/images/logo.png"}
          height={400}
          width={400}
          alt="Suupala"
        />
        <h1 className="text-center text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
          Welcome <span className="text-red-400">{username}</span> to
          <span className="text-red-500">Suu</span>
          <span className="text-red-600">pala</span>!
        </h1>
      </div>
    </>
  );
}

export default Home;
