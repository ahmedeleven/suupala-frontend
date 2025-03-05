"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  const getLinkClass = (path: string) => {
    const baseClass = "rounded-md px-3 py-2 text-sm font-medium";
    const activeClass = "bg-gray-900 text-white";
    const inactiveClass = "text-gray-300 hover:bg-gray-700 hover:text-white";

    return `${baseClass} ${pathname === path ? activeClass : inactiveClass}`;
  };
  return (
    <>
      <nav className="sticky top-0 flex bg-gradient-to-r from-red-900 to-red-800">
        <div className="max-w-7xl sm:px-6 lg:px-8">
          <div className="flex h-16 items-center ">
            <div className="flex items-center">
              <div className="flex items-center gap-2 ">
                <Link
                  href={"/"}
                  className="flex items-center text-2xl font-bold text-white"
                >
                  <Image
                    src={"/images/logo.png"}
                    alt="Suupala"
                    width={50}
                    height={50}
                  />

                  <div className="text-2xl font-bold">
                    <span className="text-white">Suu</span>
                    <span className="text-red-200">pala</span>
                  </div>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/"
                    className={getLinkClass("/")}
                    aria-current={pathname === "/" ? "page" : undefined}
                  >
                    Home
                  </Link>
                  <Link
                    href="/items"
                    className={getLinkClass("/items")}
                    aria-current={pathname === "/items" ? "page" : undefined}
                  >
                    Items
                  </Link>
                  <Link
                    href="/generate"
                    className={getLinkClass("/generate")}
                    aria-current={pathname === "/generate" ? "page" : undefined}
                  >
                    Generate
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
