import PropTypes from "prop-types";
import CheckedIcon from "../assets/icons/checked.svg?react";

const FilterOption = ({
  id,
  value,
  label,
  name,
  register = () => ({}),
  advertise,
  trigger = () => ({}),
  customErrorMessage,
}) => {
  return (
    <label htmlFor={id} className="flex items-center">
      <input
        id={id}
        type={advertise ? "radio" : "checkbox"}
        name={name}
        value={value}
        className="peer relative mr-2 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-sm border-2 border-[#3c3933] bg-[#9d988b] checked:bg-[#5a524d] focus:outline-none focus:ring-0 focus:ring-offset-1 focus:ring-offset-black"
        {...register(name, {
          validate: {
            required: () => {
              const checkBoxes = document.querySelectorAll(
                `input[name="${name}"]:checked`
              );
              return checkBoxes.length > 0 || customErrorMessage;
            },
          },
          onBlur: () => trigger(name),
        })}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.target.click();
          }
        }}
      />
      <CheckedIcon className="relative -ml-6 mr-1 hidden h-[15px] w-[15px] cursor-pointer items-center text-black peer-checked:block" />
      {label}
    </label>
  );
};

FilterOption.propTypes = {
  id: PropTypes.string.isRequired,
  advertise: PropTypes.bool,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func,
  trigger: PropTypes.func,
  customErrorMessage: PropTypes.string,
};

export default FilterOption;
