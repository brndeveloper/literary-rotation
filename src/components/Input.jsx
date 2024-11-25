import PropTypes from "prop-types";

const Input = ({ placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="h-[50px] flex-grow rounded-full border-2 border-[#9d988b] bg-[#e0dccb] p-3 text-left shadow-md placeholder:text-[#5a524d] placeholder:opacity-100 focus:outline-none"
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default Input;
