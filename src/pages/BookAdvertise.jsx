import Navbar from "../components/Navbar";
import "../styles/CustomScrollbar.css";

function BookAdvertisePage() {
  return (
    <div className="custom-scrollbar mx-auto flex h-screen max-w-screen-2xl flex-col">
      <Navbar />
      <div className="mx-auto mt-5 flex flex-1 flex-col space-y-8">
        <h2 className="text-xl font-semibold">
          Insira algumas informações sobre seu livro
        </h2>

        <form></form>
      </div>
    </div>
  );
}

export default BookAdvertisePage;
