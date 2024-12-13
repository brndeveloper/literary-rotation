import PropTypes from "prop-types";

const InputErrorMessage = ({ children }) => {
  return (
    <p className="-mt-4 mb-3 text-left text-xs font-semibold text-red-500">
      {children}
    </p>
  );
};

InputErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputErrorMessage;
