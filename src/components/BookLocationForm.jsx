import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import Input from "./Input";

const BookLocationForm = ({
  id,
  register,
  trigger,
  disabled,
  errorMessage,
  isReset,
}) => {
  const [cep, setCep] = useState("");
  const [location, setLocation] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const { setValue } = useFormContext();
  const inputRef = useRef(null);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatCep = (value) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 5) {
      return numericValue;
    }
    return `${numericValue.slice(0, 5)}-${numericValue.slice(5, 8)}`;
  };

  const calculateInputWidth = () => {
    const baseWidth = 100;
    const additionalWidth = location.length * 6;
    return baseWidth + additionalWidth;
  };

  const searchCep = async (cep) => {
    try {
      const cache = localStorage.getItem(cep);
      if (cache) {
        const cachedData = JSON.parse(cache);
        setLocation(`${cachedData.state}, ${cachedData.city}`);
        setCep(cachedData);
        setIsInputDisabled(true);
        setValue("location", {
          state: cachedData.state,
          city: cachedData.city,
        });
        setIsValid(true);
        return cachedData;
      }

      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        localStorage.setItem(
          cep,
          JSON.stringify({
            state: data.estado,
            city: data.localidade,
          })
        );

        setLocation(`${data.estado}, ${data.localidade}`);
        setCep(data);
        setIsInputDisabled(true);
        setValue("location", {
          state: data.estado,
          city: data.localidade,
        });
        setIsValid(true);
        return data;
      }

      throw new Error("CEP não encontrado");
    } catch {
      setIsValid(false);
      if (trigger) trigger("location");
    }
  };

  const handleChange = async (event) => {
    const value = event.target.value;
    const formattedValue = formatCep(value);
    setCep(formattedValue);

    if (formattedValue.length === 9) {
      setIsLoading(true);

      setTimeout(() => {
        if (trigger) trigger("location");
      }, 0);

      const cepNumber = formattedValue.replace("-", "");

      try {
        await searchCep(cepNumber);
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          if (trigger) trigger("location");
        }, 0);
      }
    }
  };

  const handleEditClick = (isReset = false) => {
    setIsInputDisabled(false);
    setCep("");
    setLocation("");

    if (!isReset) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  useEffect(() => {
    if (isReset) {
      handleEditClick(true);
    }
  }, [isReset]);

  const simpleRegisterProps = register
    ? register("location", {
        required: "CEP é obrigatório.",
        validate: (value) => {
          if (isLoading) {
            return "Validando CEP...";
          }
          if (
            typeof value === "string" &&
            value.length === 9 &&
            !isLoading &&
            !isValid
          ) {
            return "CEP não encontrado.";
          }
          if (typeof value === "string" && !value.trim())
            return "CEP não pode estar vazio.";
          if (typeof value === "string" && value.length < 9)
            return "CEP está incompleto.";
          return true;
        },
        onChange: (e) => {
          handleChange(e);
        },
        onBlur: () => trigger("location"),
      })
    : {};

  return (
    <div>
      <div className="flex items-center">
        <Input
          id={id}
          ref={inputRef}
          alternative={true}
          label="Localização"
          isRequired={true}
          placeholder="CEP"
          value={location || cep}
          maxLength="10"
          disabled={isInputDisabled || isLoading}
          style={{ width: `${calculateInputWidth()}px` }}
          onChange={(e) => {
            if (simpleRegisterProps.onChange) simpleRegisterProps.onChange(e);
            else handleChange(e);
          }}
          onBlur={() => {
            if (simpleRegisterProps.onBlur && trigger)
              simpleRegisterProps.onBlur();
          }}
          errorMessage={errorMessage}
          {...simpleRegisterProps}
        />
        {isInputDisabled && location && !disabled && (
          <span
            onClick={() => handleEditClick()}
            className="mr-20 mt-1 cursor-pointer text-sm text-[#6B6059] underline transition duration-200 hover:text-[#5a524d]"
          >
            Editar CEP
          </span>
        )}
      </div>
    </div>
  );
};

BookLocationForm.propTypes = {
  id: PropTypes.string.isRequired,
  register: PropTypes.func,
  trigger: PropTypes.func,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  isReset: PropTypes.bool,
};

export default BookLocationForm;
