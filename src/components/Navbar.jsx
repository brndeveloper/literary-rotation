import NavItem from "./NavItem";
import ProfileButton from "./ProfileButton";

const Navbar = () => {
  return (
    <nav className="relative mx-auto ml-2 flex w-full max-w-screen-2xl items-center justify-between px-4 py-4 md:px-8 md:py-5">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-grow flex-wrap items-center gap-8 p-5 sm:gap-20 sm:p-0">
          <NavItem to="/">Buscar</NavItem>
          <NavItem to="/meus-livros">Meus livros</NavItem>
          <NavItem to="/anunciar">Anunciar</NavItem>
          <NavItem to="/perfil">Perfil</NavItem>
        </div>
        <div className="absolute ml-[400px] sm:relative sm:ml-auto">
          <ProfileButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
