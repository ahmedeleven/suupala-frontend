import Image from "next/image";

function Footer() {
  return (
    <footer className="mt-auto  bottom-0 w-full bg-gradient-to-r from-red-900 to-red-800 py-4 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <p className="flex text-xs">
            <span>
              <Image
                src={"/images/logo.png"}
                width={25}
                height={25}
                alt="Suupala"
              />
            </span>
            <span className="p-1">© 2024 All rights reserved.</span>
          </p>
          <ul className="list-unstyled flex space-x-4">
            <li>
              <a href="#" className="text-white hover:text-red-100">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-red-100">
                Privacy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
