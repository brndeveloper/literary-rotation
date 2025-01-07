import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import SearchFilterIcon from "../assets/icons/search-filter.svg?react";
import FieldLabel from "./FieldLabel";
import InputErrorMessage from "./InputErrorMessage";

const SidebarPriceFilter = ({
  id,
  advertise,
  register,
  trigger,
  disabled,
  errorMessage,
  isReset,
}) => {
  const [price, setPrice] = useState("");
  const { setValue } = useFormContext() || {};

  const formatPrice = (value) => {
    const numericValue = value.replace(/\D/g, "");

    if (numericValue === "") return "";

    const formattedValue = (parseInt(numericValue, 10) / 100).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );

    return formattedValue.replace("R$", "").trim();
  };

  const handlePriceChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatPrice(inputValue);
    setPrice(formattedValue);
  };

  const handleReset = useCallback(() => {
    const resetValue = "0,00";
    setValue("price", resetValue);
    setPrice(resetValue);
  }, [setValue]);

  useEffect(() => {
    if (isReset) handleReset();
  }, [isReset, handleReset]);

  const simpleRegisterProps = register
    ? register("price", {
        required: "Insira o preço.",
        validate: (value) => {
          if (!value.trim()) return "O livro não pode estar sem preço.";

          const numericValue = parseFloat(
            value.replace(/\./g, "").replace(",", ".")
          );

          if (numericValue < 0.01) return "Preço deve estar acima de R$0,00.";
          return true;
        },
        onChange: (e) => {
          handlePriceChange(e);
        },
        onBlur: () => {
          trigger("price");
        },
      })
    : {};

  const inputClasses =
    "h-10 w-1/3 rounded border-2 border-[#9d988b] bg-[#e0dccb] p-3 text-left shadow-md placeholder:text-[#5a524d] placeholder:opacity-100 focus:outline-none";

  return (
    <div className="space-y-3">
      {advertise ? (
        <FieldLabel htmlFor={id} isRequired={true}>
          Preço (R$)
        </FieldLabel>
      ) : (
        <FieldLabel>Preço</FieldLabel>
      )}
      <div className="flex space-x-2">
        {advertise ? (
          <div>
            <input
              id={id}
              type="text"
              className={`${inputClasses} mb-4`}
              onChange={handlePriceChange}
              value={price}
              disabled={disabled}
              onBlur={() => {
                if (simpleRegisterProps.onBlur && trigger) {
                  trigger("price");
                }
              }}
              placeholder="0,00"
              {...simpleRegisterProps}
            />
            {errorMessage && (
              <InputErrorMessage>{errorMessage}</InputErrorMessage>
            )}
          </div>
        ) : (
          <div className="flex space-x-2">
            <input type="number" className={inputClasses} placeholder="Min." />
            <input type="number" className={inputClasses} placeholder="Máx." />
            <button>
              <SearchFilterIcon className="cursor-pointer text-[#6B6059] transition duration-300 hover:text-[#5a524d]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

SidebarPriceFilter.propTypes = {
  id: PropTypes.string.isRequired,
  advertise: PropTypes.bool,
  register: PropTypes.func,
  trigger: PropTypes.func,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  isReset: PropTypes.bool,
};

export default SidebarPriceFilter;
