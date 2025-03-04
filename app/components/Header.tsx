import Link from "next/link";
import Image from "next/image";

function Header() {
  return (
    <>
      <header>
        <nav className="sticky top-0 flex bg-gradient-to-r from-red-900 to-red-800">
          <div className="flex items-center gap-2 p-2">
            <Link
              href="/"
              className="flex items-center text-2xl font-bold text-white"
            >
              <Image
                src={"/images/logo.png"}
                width={50}
                height={50}
                alt="Suupala"
              />
              <div className="text-2xl font-bold">
                Suu<span className="text-red-200">pala</span>
              </div>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
