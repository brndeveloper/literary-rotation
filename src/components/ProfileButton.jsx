import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import data from "../../db.json";
import DefaultProfileIcon from "../assets/icons/profile-default.svg?react";
import woodTexture from "../assets/images/retina-wood.png";

const ProfileButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const users = data.users;

  const getUser = () => {
    const user = users.find((user) => user.id === 6);
    return user ? user.user : "admin";
  };

  const toggleMenu = (event) => {
    event.stopPropagation();
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="flex items-center gap-2 rounded-full border-2 border-black bg-cover bg-center p-2"
        style={{ backgroundImage: `url('${woodTexture}')` }}
      >
        <DefaultProfileIcon />
        <span>{getUser()}</span>
        <span>&#9660;</span>
        <div className="absolute inset-0 rounded-full bg-amber-600 opacity-0 transition-opacity duration-300 hover:opacity-15"></div>
      </button>

      <div
        ref={menuRef}
        className="absolute right-0 mt-2 w-48 rounded border-2 border-black bg-cover bg-center shadow-lg transition-all duration-300 ease-in-out"
        style={{
          backgroundImage: `url('${woodTexture}')`,
          opacity: isMenuOpen ? 1 : 0,
          transform: isMenuOpen ? "translateY(0)" : "translateY(-4px)",
          visibility: isMenuOpen ? "visible" : "hidden",
        }}
      >
        <ul className="text-sm">
          <li>
            <NavLink
              onClick={toggleMenu}
              to="/perfil"
              className="block px-4 py-2 transition duration-300 hover:bg-amber-600 hover:bg-opacity-15 hover:text-black"
            >
              Configurações
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileButton;
