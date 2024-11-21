import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "font-semibold underline underline-offset-4" : ""
      }
    >
      {children}
    </NavLink>
  );
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavItem;
