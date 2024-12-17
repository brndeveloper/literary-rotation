import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import Input from "./Input";

const BookLocationForm = ({
  id,
  register,
  trigger,
  errorMessage,
  setError,
}) => {
  const [cep, setCep] = useState("");
  const [location, setLocation] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const { setValue } = useFormContext();
  const inputRef = useRef(null);

  const formatCep = (value) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 5) {
      return numericValue;
    }
    return `${numericValue.slice(0, 5)}-${numericValue.slice(5, 8)}`;
  };

  const calculateInputWidth = () => {
    const baseWidth = 100;
    const additionalWidth = location.length * 8;
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
        console.log("Dados obtidos da API:", data);

        setLocation(`${data.estado}, ${data.localidade}`);
        setCep(data);
        setIsInputDisabled(true);
        setValue("location", {
          state: data.estado,
          city: data.localidade,
        });
        return data;
      }

      throw new Error("CEP não encontrado");
    } catch {
      setError("location", { type: "manual", message: "CEP não encontrado." });
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const formattedValue = formatCep(value);
    setCep(formattedValue);

    if (formattedValue.length === 9) {
      const cepNumber = formattedValue.replace("-", "");
      searchCep(cepNumber);
      if (trigger) trigger("location");
    }
  };

  const handleEditClick = () => {
    setIsInputDisabled(false);
    setCep("");
    setLocation("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const simpleRegisterProps = register
    ? register("location", {
        required: "CEP é obrigatório.",
        validate: (value) => {
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
      <div className="relative">
        <Input
          id={id}
          ref={inputRef}
          alternative={true}
          label="Localização"
          isRequired={true}
          placeholder="CEP"
          value={location || cep}
          maxLength="10"
          disabled={isInputDisabled}
          style={{ width: `${calculateInputWidth()}px` }}
          onChange={(e) => {
            if (simpleRegisterProps.onChange) simpleRegisterProps.onChange(e);
            else handleChange(e);
          }}
          onBlur={() => {
            if (simpleRegisterProps.onBlur && trigger)
              simpleRegisterProps.onBlur;
          }}
          errorMessage={errorMessage}
          {...simpleRegisterProps}
        />
        {isInputDisabled && location && (
          <span
            onClick={handleEditClick}
            className="absolute right-32 top-10 -translate-y-1/2 transform cursor-pointer text-sm text-[#6B6059] underline transition duration-200 hover:text-[#5a524d]"
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
  errorMessage: PropTypes.string,
  setError: PropTypes.func,
};

export default BookLocationForm;
