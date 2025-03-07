"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function Header() {
  const pathname = usePathname();
  const [token, setToken] = useState<String | null>();

  useEffect(() => {
    setToken(Cookies.get("token"));

    const handleRouteChange = () => {
      const token = Cookies.get("token");
      setToken(token);
    };

    handleRouteChange();
  }, [pathname]);
  const getLinkClass = (path: string) => {
    const baseClass = "rounded-md px-3 py-2 text-sm font-medium";
    const activeClass = "bg-gray-900 text-white";
    const inactiveClass = "text-gray-300 hover:bg-gray-700 hover:text-white";

    return `${baseClass} ${pathname === path ? activeClass : inactiveClass}`;
  };
  return (
    <>
      <nav className="sticky top-0 flex bg-gradient-to-r from-red-900 to-red-800 z-10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side group */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center text-2xl font-bold text-white"
              >
                <Image
                  src="/images/logo.png"
                  alt="Suupala"
                  width={50}
                  height={50}
                />
                <div className="text-2xl font-bold">
                  <span className="text-white">Suu</span>
                  <span className="text-red-200">pala</span>
                </div>
              </Link>
              <Link href="/" className={getLinkClass("/")}>
                Home
              </Link>
              <Link href="/items" className={getLinkClass("/items")}>
                Items
              </Link>
              <Link href="/generate" className={getLinkClass("/generate")}>
                Generate
              </Link>
              <Link href="/recipes" className={getLinkClass("/recipes")}>
                Recipes
              </Link>
            </div>

            {/* Right side auth button */}
            <div className="flex items-center">
              {token ? (
                <Link href="/logout" className={getLinkClass("/logout")}>
                  Logout
                </Link>
              ) : (
                <Link href="/login" className={getLinkClass("/login")}>
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
