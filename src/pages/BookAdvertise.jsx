import { useForm } from "react-hook-form";
import BookLocationForm from "../components/BookLocationForm";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import SidebarConditionFilter from "../components/SidebarConditionFilter";
import SideBarGenreFilter from "../components/SidebarGenreFilter";
import SidebarPriceFilter from "../components/SidebarPriceFilter";
import TextArea from "../components/TextArea";
import UploadBox from "../components/UploadBox";
import "../styles/CustomScrollbar.css";
// import db from "../../db.json"

function BookAdvertisePage() {
  const {
    register,
    formState: { errors },
    trigger,
    setError,
  } = useForm();

  /*
  const getBookId = () => {
    const lastId = db.books.reduce(
      (maxId, book) => Math.max(maxId, book.id),
      0
    );
    return lastId + 1; 
  };

  const handleAnnounceBookClick = async (data) => {
    const id = getBookId();
    const date = new Date().toISOString();

    const book = {
      id,
      ownerId: 6,
      title: data.title,
      description: data.description,
      genres: data.genres,
      condition: data.condition,
      price: data.price,
      location: data.location,
      images: data.upload,
    };
  };
  */

  return (
    <div className="custom-scrollbar mx-auto flex h-screen max-w-screen-2xl flex-col">
      <Navbar />
      <div className="mx-auto mt-5 flex flex-1 flex-col space-y-8">
        <h2 className="text-xl font-semibold">
          Insira algumas informações sobre seu livro
        </h2>

        <form>
          <div className="flex flex-col items-start space-y-4">
            <div className="w-full">
              <UploadBox
                id="file-upload-adv"
                register={register}
                trigger={trigger}
                errorMessage={errors?.upload?.message}
              />
              <Input
                id="title"
                label="Título do livro"
                placeholder="Ex.: O Homem Invisível"
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
                errorMessage={errors?.genres?.message}
                customErrorMessage="Pelo menos um gênero deve ser selecionado."
              />
              <SidebarConditionFilter
                id="condition-adv"
                advertise={true}
                register={register}
                trigger={trigger}
                errorMessage={errors?.condition?.message}
                customErrorMessage="A condição do livro é obrigatória."
              />
              <SidebarPriceFilter
                id="price-adv"
                advertise={true}
                register={register}
                trigger={trigger}
                errorMessage={errors?.price?.message}
              />
              <BookLocationForm
                id="location-adv"
                register={register}
                trigger={trigger}
                errorMessage={errors?.location?.message}
                setError={setError}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookAdvertisePage;
