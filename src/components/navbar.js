import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/ayo-masak.png";

export default function NavBar() {
  const [toggle, setToggle] = useState(false);
  let location = useLocation();

  const activeNavLink = (path) => {
    return location.pathname === path ? `font-bold text-browen-800` : "";
  };

  const toggleMenu = () => {
    setToggle(!toggle);
  };
  return (
    <header>
      <div
        style={{ position: "fixed", top: "0" }}
        className=" w-full py-4 px-5 bg-dark-800"
      >
        <div className="container mx-auto flex flex-row justify-between items-center ">
          <div className="font-bold text-xl text-white">
            {/* <Link to="/"> */}
            {/* <span className="font-extrabold">Go</span>Cooking */}
            {/* <img src={Logo} alt="logo" className="w-32" /> */}
            {/* </Link> */}

            <Link to="/">
              <img src={Logo} alt="Masak Enak Logo" className="w-20" />
            </Link>
          </div>
          <nav className="">
            <ul className="hidden lg:flex items-center font text-white">
              <li className={`mx-3 ${activeNavLink("/")}`}>
                <Link to="/">
                  <i className="fa fa-house text-lg px-1"></i> Home
                </Link>
              </li>
              <li className={`mx-3 ${activeNavLink("/recipes")}`}>
                <Link to="/recipes">
                  <i className="fa fa-clipboard-list text-lg px-1"></i> Resep
                </Link>
              </li>
              <li className={`mx-3 ${activeNavLink("/saved-recipes")}`}>
                <Link to="/saved-recipes">
                  <i className="fa fa-bookmark text-lg px-1"></i> Resep Favorit
                </Link>
              </li>
              <li className={`mx-3 ${activeNavLink("/about")}`}>
                <Link to="/about">
                  <i className="fab fa-angular text-lg px-1"></i> Tentang
                </Link>
              </li>
            </ul>
            <button className="block lg:hidden" onClick={() => toggleMenu()}>
              <svg
                className=" h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
      {toggle ? (
        <div
          className="px-5 block lg:hidden w-full bg-gray-800 h-auto "
          style={{ position: "fixed", top: "80px" }}
        >
          <ul className="container mx-auto flex flex-col font text-white">
            <li className={`py-2 ${activeNavLink("/")}`}>
              <Link to="/">
                <i className="fa fa-home"></i> Home
              </Link>
            </li>
            <li className={`py-2 ${activeNavLink("/recipes")}`}>
              <Link to="/recipes">
                {" "}
                <i className="fa fa-clipboard-list"></i> Resep
              </Link>
            </li>
            <li className={`py-2 ${activeNavLink("/saved-recipes")}`}>
              <Link to="/saved-recipes">
                <i className="fa fa-bookmark"></i> Resep Favorit
              </Link>
            </li>
            <li className={`pb-3 ${activeNavLink("/about")}`}>
              <Link to="/about">
                <i className="fab fa-angular "></i> Tentang
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
