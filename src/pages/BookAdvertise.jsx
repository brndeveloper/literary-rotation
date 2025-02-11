import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import db from "../../db.json";
import BookLocationForm from "../components/BookLocationForm";
import Button from "../components/Button";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import SidebarConditionFilter from "../components/SidebarConditionFilter";
import SideBarGenreFilter from "../components/SidebarGenreFilter";
import SidebarPriceFilter from "../components/SidebarPriceFilter";
import TextArea from "../components/TextArea";
import UploadBox from "../components/UploadBox";
import "../styles/CustomScrollbar.css";

function BookAdvertisePage() {
  const methods = useForm();

  const {
    register,
    formState: { errors, isSubmitting },
    trigger,
    handleSubmit,
    reset,
  } = methods;

  const [images, setImages] = useState();
  const [resetKey, setResetKey] = useState(0);
  const [isReset, setIsReset] = useState(false);

  const handleImagesChange = useCallback((newImages) => {
    setImages(newImages);
  }, []);

  const handleResetForm = () => {
    reset();
    setResetKey((prevKey) => prevKey + 1);
    setIsReset(true);

    setTimeout(() => {
      setIsReset(false);
    }, 200);
  };

  const getBookId = () => {
    const lastId = db.books.reduce(
      (maxId, book) => Math.max(maxId, book.id),
      0
    );
    return lastId + 1;
  };

  const formatDateToBR = () => {
    const date = new Date();

    // ajustando para o fuso horário de Brasília (UTC-3), pois UTC é o padrão no iso string
    const offset = -3;
    date.setHours(date.getUTCHours() + offset);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

    return formattedDate;
  };

  const handleAnnounceBookClick = async (data) => {
    const isValid = await trigger();

    const bookId = getBookId();
    const date = formatDateToBR();

    if (!isValid) {
      return;
    }

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image.file);
    });

    const uploadResponse = await fetch(
      `http://localhost:3001/upload/${bookId}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await uploadResponse.json();
    const imagePaths = result.imagePaths;

    const book = {
      id: bookId,
      ownerId: 6,
      title: data.title,
      description: data.description,
      genres: data.genres,
      condition: data.condition,
      price: parseFloat(data.price),
      location: data.location,
      images: imagePaths,
      createdAt: date,
    };

    const response = await fetch("http://localhost:3001/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    if (response.ok) {
      toast.success("Livro anunciado com sucesso!");
      handleResetForm();
    } else {
      toast.error("Erro ao anunciar o livro.");
    }
  };

  return (
    <div className="custom-scrollbar flex h-screen max-w-screen-2xl flex-col md:mx-auto md:overflow-x-hidden">
      <Navbar />
      <div className="ml-32 mt-5 flex w-full flex-1 flex-col space-y-8 sm:mr-24 sm:w-auto md:mx-auto md:w-auto">
        <h2 className="text-xl font-semibold">
          Insira algumas informações sobre seu livro
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleAnnounceBookClick)}>
            <div className="flex flex-col items-start space-y-4">
              <div className="w-full">
                <UploadBox
                  id="file-upload-adv"
                  register={register}
                  trigger={trigger}
                  errorMessage={errors?.upload?.message}
                  onImagesChange={handleImagesChange}
                  resetKey={resetKey}
                  isSubmitting={isSubmitting}
                />
                <Input
                  id="title"
                  label="Título do livro"
                  placeholder="Ex.: O Homem Invisível"
                  disabled={isSubmitting}
                  isRequired={true}
                  {...register("title", {
                    required: "O título do livro é obrigatório.",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "O título não pode ser vazio.";
                      }
                      return true;
                    },
                    onBlur: () => trigger("title"),
                  })}
                  errorMessage={errors?.title?.message}
                />
                <TextArea
                  id="description"
                  label="Descrição"
                  placeholder="Ex.: Descrição do livro, conservação, etc."
                  disabled={isSubmitting}
                  isRequired={true}
                  {...register("description", {
                    required: "A descrição do livro é obrigatória.",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "A descrição não pode ser vazia.";
                      }
                      return true;
                    },
                    onBlur: () => trigger("description"),
                  })}
                  errorMessage={errors?.description?.message}
                />
                <SideBarGenreFilter
                  id="genre-adv"
                  advertise={true}
                  register={register}
                  trigger={trigger}
                  disabled={isSubmitting}
                  errorMessage={errors?.genres?.message}
                  customErrorMessage="Pelo menos um gênero deve ser selecionado."
                />
                <SidebarConditionFilter
                  id="condition-adv"
                  advertise={true}
                  register={register}
                  trigger={trigger}
                  disabled={isSubmitting}
                  errorMessage={errors?.condition?.message}
                  customErrorMessage="A condição do livro é obrigatória."
                />
                <SidebarPriceFilter
                  id="price-adv"
                  advertise={true}
                  register={register}
                  trigger={trigger}
                  disabled={isSubmitting}
                  errorMessage={errors?.price?.message}
                  isReset={isReset}
                />
                <BookLocationForm
                  id="location-adv"
                  register={register}
                  trigger={trigger}
                  disabled={isSubmitting}
                  errorMessage={errors?.location?.message}
                  isReset={isReset}
                />
                <div className="flex">
                  <Button
                    position="left"
                    variant="danger"
                    disabled={isSubmitting}
                    onClick={(event) => {
                      event.preventDefault();
                      handleResetForm();
                    }}
                  >
                    Limpar
                  </Button>
                  <Button
                    position="right"
                    disabled={isSubmitting}
                    isSubmitting={isSubmitting}
                  >
                    Anunciar
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default BookAdvertisePage;
