import PropTypes from "prop-types";
import { forwardRef } from "react";
import FieldLabel from "./FieldLabel";
import InputErrorMessage from "./InputErrorMessage";

const Input = forwardRef(
  (
    {
      id,
      label,
      placeholder,
      alternative,
      isRequired,
      errorMessage,
      disabled,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="flex flex-grow flex-col">
        {label && (
          <FieldLabel htmlFor={id} isRequired={isRequired}>
            {label}
          </FieldLabel>
        )}
        <input
          ref={ref}
          id={id}
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          className={
            alternative
              ? `h-10 w-1/3 rounded border-2 ${label && "mb-4"} ${disabled && "cursor-not-allowed text-[#6B6059]"} border-[#9d988b] bg-[#e0dccb] p-3 text-left shadow-md placeholder:text-[#5a524d] placeholder:opacity-75 focus:outline-none`
              : `size-0 ${label && "mb-4"} h-[50px] w-full flex-grow rounded-full border-2 border-[#9d988b] bg-[#e0dccb] p-3 text-left shadow-md placeholder:text-[#5a524d] placeholder:opacity-75 focus:outline-none sm:p-3`
          }
          {...rest}
        />
        {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
      </div>
    );
  }
);

Input.displayName = "Input";

Input.propTypes = {
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  alternative: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
