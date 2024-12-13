import PropTypes from "prop-types";

const FieldLabel = ({
  as: Element = "label",
  htmlFor,
  children,
  isRequired,
}) => {
  return (
    <Element
      className={`relative ${isRequired ? "text-sm" : ""} font-semibold`}
      htmlFor={Element === "label" ? htmlFor : undefined}
    >
      {children}
      {isRequired && (
        <span className="group relative select-none text-red-500">
          *
          <span className="pointer-events-none absolute left-full top-1/2 m-1 scale-95 transform whitespace-nowrap rounded bg-[#6B6059] p-1 text-xs text-white text-opacity-75 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
            Este campo é obrigatório.
          </span>
        </span>
      )}
    </Element>
  );
};

FieldLabel.propTypes = {
  as: PropTypes.oneOf(["label", "legend"]),
  htmlFor: PropTypes.string,
  children: PropTypes.node.isRequired,
  isRequired: PropTypes.bool,
};

export default FieldLabel;
