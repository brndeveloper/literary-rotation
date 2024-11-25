import PropTypes from "prop-types";

const SidebarButton = ({ children }) => {
  return (
    <button className="h-[50px] w-full rounded-full border-2 border-[#9d988b] bg-[#e0dccb] p-3 text-left shadow-md">
      {children}
    </button>
  );
};

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SidebarButton;
