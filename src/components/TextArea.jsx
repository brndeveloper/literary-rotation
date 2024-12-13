import PropTypes from "prop-types";
import { forwardRef } from "react";
import FieldLabel from "./FieldLabel";
import InputErrorMessage from "./InputErrorMessage";

const TextArea = forwardRef(
  (
    { id, label, placeholder, isRequired, errorMessage, disabled, ...rest },
    ref
  ) => {
    return (
      <div className="flex flex-grow flex-col">
        {label && (
          <FieldLabel htmlFor={id} isRequired={isRequired}>
            {label}
          </FieldLabel>
        )}
        <textarea
          ref={ref}
          id={id}
          disabled={disabled}
          className={`size-0 ${label && "mb-4"} h-40 w-full flex-grow rounded-md border-2 border-[#9d988b] bg-[#e0dccb] p-3 text-left shadow-md placeholder:text-[#5a524d] placeholder:opacity-75 focus:outline-none sm:p-3`}
          style={{ maxHeight: "200px", minHeight: "160px" }}
          placeholder={placeholder}
          {...rest}
        />
        {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TextArea;
