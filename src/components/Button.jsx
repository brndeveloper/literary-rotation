import PropTypes from "prop-types";

const Button = ({ children, ...rest }) => {
  return (
    <button
      className="mb-2 ml-auto block w-[100px] rounded-full border-2 border-[#3c3933] bg-[#6B6059] p-3 text-[#eceae2] shadow-md transition duration-300 hover:bg-[#5a524d] sm:w-[150px]"
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
