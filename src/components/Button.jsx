import PropTypes from "prop-types";
import LoaderIcon from "../assets/icons/loader.svg?react";

const Button = ({
  children,
  variant = "default",
  position = "left",
  isSubmitting,
  disabled,
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
      className={`mb-2 ${variantClasses[variant]} ${positionClasses[position]} ${disabled && "cursor-not-allowed"} flex w-[100px] items-center justify-center space-x-5 rounded-full border-2 border-[#3c3933] p-3 shadow-md transition duration-300 sm:w-[150px]`}
      disabled={disabled}
      {...rest}
    >
      {isSubmitting && <LoaderIcon className="mr-2 animate-spin" />}
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  position: PropTypes.string,
  disabled: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
