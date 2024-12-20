import PropTypes from "prop-types";

const Button = ({
  children,
  variant = "default",
  position = "left",
  ...rest
}) => {
  const variantClasses = {
    default: "bg-[#6B6059] hover:bg-[#5a524d] text-[#eceae2]",
    danger: "bg-[#b52222] hover:bg-[#982525] text-white",
  };

  const positionClasses = {
    left: "ml-0 mr-auto",
    center: "mx-auto",
    right: "ml-auto mr-0",
  };

  return (
    <button
      className={`mb-2 ${variantClasses[variant]} ${positionClasses[position]} block w-[100px] rounded-full border-2 border-[#3c3933] p-3 shadow-md transition duration-300 sm:w-[150px]`}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  position: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
