import NavItem from "./NavItem";
import ProfileButton from "./ProfileButton";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-5">
      <div className="flex items-center gap-40 font-medium">
        <NavItem to="/">Buscar</NavItem>
        <NavItem to="/meus-livros">Meus Livros</NavItem>
        <NavItem to="/anunciar">Anunciar</NavItem>
        <NavItem to="/perfil">*Perfil*</NavItem>
      </div>
      <div>
        <ProfileButton />
      </div>
    </nav>
  );
};

export default Navbar;
