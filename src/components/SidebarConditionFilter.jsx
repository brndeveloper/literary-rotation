import PropTypes from "prop-types";
import FieldLabel from "./FieldLabel";
import FilterOption from "./FilterOption";
import InputErrorMessage from "./InputErrorMessage";

const SidebarConditionFilter = ({
  id,
  register,
  trigger,
  errorMessage,
  customErrorMessage,
  advertise,
}) => {
  const conditions = [
    {
      value: "novo",
      label: "Novo",
    },
    {
      value: "excelente",
      label: "Usado - Excelente",
    },
    {
      value: "bom",
      label: "Usado - Bom",
    },
  ];
  const effectiveRegister = register || (() => ({}));
  const effectiveTrigger = trigger || (() => {});

  return (
    <fieldset className="rounded-md py-4">
      {advertise ? (
        <div className="-mt-3 flex items-baseline space-x-3">
          <div className="mb-2">
            <FieldLabel isRequired={true} as="legend">
              Condição
            </FieldLabel>
          </div>
          {errorMessage && (
            <InputErrorMessage>{errorMessage}</InputErrorMessage>
          )}
        </div>
      ) : (
        <FieldLabel as="legend">Condição</FieldLabel>
      )}
      <div className="space-y-2">
        {conditions.map((condition) => (
          <FilterOption
            id={`${id}-${condition.value}`}
            key={condition.value}
            name="condition"
            value={condition.value}
            label={condition.label}
            advertise={true}
            trigger={effectiveTrigger}
            register={effectiveRegister}
            customErrorMessage={customErrorMessage}
          />
        ))}
      </div>
    </fieldset>
  );
};

SidebarConditionFilter.propTypes = {
  id: PropTypes.string.isRequired,
  advertise: PropTypes.bool,
  register: PropTypes.func,
  trigger: PropTypes.func,
  errorMessage: PropTypes.string,
  customErrorMessage: PropTypes.string,
};

export default SidebarConditionFilter;
