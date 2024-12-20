import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import RemoveIcon from "../assets/icons/close.svg?react";
import InputErrorMessage from "./InputErrorMessage";

const UploadBox = ({
  id,
  register,
  trigger,
  errorMessage,
  onImagesChange,
  resetKey,
}) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [removingIndex, setRemovingIndex] = useState(null);
  const maxFiles = 6;

  useEffect(() => {
    setUploadedImages([]);
    onImagesChange([]);
  }, [resetKey, onImagesChange]);

  const handleUpload = (event) => {
    const files = Array.from(event.target.files);

    const validImages = files.filter((file) => file.type.startsWith("image/"));
    const totalImages = uploadedImages.length + validImages.length;

    if (totalImages > maxFiles) {
      return;
    }

    const newImages = validImages.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setUploadedImages((prevImages) => {
      const updatedImages = [...prevImages, ...newImages];

      setTimeout(() => {
        onImagesChange(updatedImages);
        trigger("upload");
      }, 0);
      return updatedImages;
    });
  };

  const handleRemove = (index) => {
    setRemovingIndex(index);
    setTimeout(() => {
      setUploadedImages((prevImages) => {
        const updatedImages = prevImages.filter((_, i) => i !== index);
        onImagesChange(updatedImages);
        setTimeout(() => {
          trigger("upload");
        }, 0);
        return updatedImages;
      });
      setRemovingIndex(null);
    }, 300);
  };

  const isUploadDisabled = uploadedImages.length >= maxFiles;

  const simpleRegisterProps = register
    ? register("upload", {
        validate: () => {
          if (uploadedImages.length < 1)
            return "A inclusão de uma foto é obrigatória.";
          return true;
        },
      })
    : {};

  return (
    <div className="mb-5 flex flex-col items-center justify-center space-y-4">
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
      <label
        htmlFor={id}
        className={`flex h-40 w-80 flex-col items-center justify-center rounded-lg border-2 border-dashed transition duration-200 ${
          isUploadDisabled
            ? "cursor-not-allowed border-[#6B6059] opacity-50"
            : "cursor-pointer border-[#6B6059] hover:bg-[#5a524d] hover:bg-opacity-10"
        }`}
      >
        <svg
          className="h-10 w-10 text-[#6B6059]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <p className="mt-2 text-sm font-semibold text-[#6B6059]">
          {isUploadDisabled ? (
            "Máximo de imagens atingido"
          ) : (
            <>
              Incluir foto(s)
              <span className="group relative select-none text-red-500">
                *
                <span className="pointer-events-none absolute left-full top-1/2 m-1 scale-95 transform whitespace-nowrap rounded bg-[#6B6059] p-1 text-xs text-white text-opacity-75 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                  Este campo é obrigatório.
                </span>
              </span>
            </>
          )}
        </p>
        <p className="text-sm text-gray-500">
          {uploadedImages.length} de {maxFiles} adicionadas
        </p>
        <input
          id={id}
          type="file"
          multiple
          className="hidden"
          onChange={isUploadDisabled ? undefined : handleUpload}
          accept="image/*"
          disabled={isUploadDisabled}
          onBlur={() => {
            if (simpleRegisterProps.onBlur && trigger) {
              trigger("upload");
            }
          }}
        />
      </label>

      <div className="grid grid-cols-3 gap-4">
        {uploadedImages.map((image, index) => (
          <div
            key={index}
            className={`relative h-32 w-32 transition-opacity duration-300 ${
              removingIndex === index ? "opacity-0" : "opacity-100"
            }`}
          >
            {index === 0 && (
              <p className="absolute left-0 top-0 w-full rounded-t-md bg-black bg-opacity-60 text-center text-xs font-semibold text-white">
                Foto principal
              </p>
            )}

            <img
              src={image.url}
              alt={`Preview ${index + 1}`}
              className="h-full w-full rounded-md object-cover"
            />
            <button
              onClick={(event) => {
                event.preventDefault();
                handleRemove(index);
              }}
              className="absolute -right-2 top-28 rounded-full bg-black bg-opacity-75 p-1 text-xs text-white transition duration-200 hover:bg-red-600 hover:text-white"
            >
              <RemoveIcon className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

UploadBox.propTypes = {
  onImagesChange: PropTypes.func.isRequired,
  resetKey: PropTypes.number,
  id: PropTypes.string.isRequired,
  register: PropTypes.func,
  trigger: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default UploadBox;
