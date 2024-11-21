import { useState } from "react";
import DefaultProfileIcon from "../assets/icons/profile-default.svg?react";

const ProfileButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {/* Botão de perfil */}
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 rounded-full border border-black p-2 hover:bg-gray-200"
      >
        <DefaultProfileIcon />
        <span>john94</span>
        <span>&#9660;</span>
      </button>

      {/* Menu suspenso */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded border bg-white shadow-lg">
          <ul className="text-sm">
            <li>
              <a href="/perfil" className="block px-4 py-2 hover:bg-gray-100">
                Configurações
              </a>
            </li>
            {/* Mais opções podem ser adicionadas aqui */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
