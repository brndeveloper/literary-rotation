import PropTypes from "prop-types";
import FieldLabel from "./FieldLabel";
import FilterOption from "./FilterOption";
import InputErrorMessage from "./InputErrorMessage";

const SideBarGenreFilter = ({
  id,
  register,
  errorMessage,
  customErrorMessage,
  advertise,
  trigger,
  disabled,
}) => {
  const genres = [
    { value: "ficcao", label: "Ficção" },
    { value: "ficcao-cientifica", label: "Ficção Científica" },
    { value: "fantasia", label: "Fantasia" },
    { value: "romance", label: "Romance" },
    { value: "suspense", label: "Suspense" },
    { value: "misterio", label: "Mistério" },
    { value: "biografia", label: "Biografia" },
    { value: "autoajuda", label: "Autoajuda" },
    { value: "aventura", label: "Aventura" },
    { value: "historia", label: "História" },
    { value: "ficcao-historica", label: "Ficção Histórica" },
    { value: "drama", label: "Drama" },
    { value: "poesia", label: "Poesia" },
    { value: "terror", label: "Terror" },
    { value: "thriller", label: "Thriller" },
    { value: "jovem-adulto", label: "Jovem Adulto" },
    { value: "literatura-infantil", label: "Literatura Infantil" },
    { value: "literatura-classica", label: "Literatura Clássica" },
    { value: "humor", label: "Humor" },
    { value: "distopia", label: "Distopia" },
    { value: "contos", label: "Contos" },
    { value: "ensaios", label: "Ensaios" },
    { value: "gastronomia", label: "Gastronomia" },
    { value: "viagem", label: "Viagem" },
    { value: "memorias", label: "Memórias" },
    { value: "educacao", label: "Educação" },
    { value: "negocios", label: "Negócios" },
  ];
  const effectiveRegister = register || (() => ({}));
  const effectiveTrigger = trigger || (() => {});

  return (
    <fieldset className="rounded-md py-4">
      {advertise ? (
        <div className="-mt-3 flex items-baseline space-x-3">
          <div className="mb-3">
            <FieldLabel isRequired={true} as="legend">
              Gênero(s)
            </FieldLabel>
          </div>
          {errorMessage && (
            <InputErrorMessage>{errorMessage}</InputErrorMessage>
          )}
        </div>
      ) : (
        <FieldLabel as="legend">Gênero(s)</FieldLabel>
      )}
      <div className="grid grid-cols-2 gap-2">
        {genres.map((option) => (
          <FilterOption
            id={`${id}-${option.value}`}
            key={option.value}
            name="genres"
            disabled={disabled}
            value={option.value}
            label={option.label}
            trigger={effectiveTrigger}
            register={effectiveRegister}
            customErrorMessage={customErrorMessage}
          />
        ))}
      </div>
    </fieldset>
  );
};

SideBarGenreFilter.propTypes = {
  id: PropTypes.string.isRequired,
  advertise: PropTypes.bool,
  register: PropTypes.func,
  errorMessage: PropTypes.string,
  trigger: PropTypes.func,
  disabled: PropTypes.bool,
  customErrorMessage: PropTypes.string,
};

export default SideBarGenreFilter;
