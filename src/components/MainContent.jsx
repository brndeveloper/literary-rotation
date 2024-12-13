import data from "../../db.json";
import HeaderContentBanner from "./HeaderContentBanner";

const MainContent = () => {
  const books = data.books;
  const users = data.users;

  return (
    <div className="mt-6 space-y-6 px-8 py-16 sm:overflow-hidden md:overflow-y-auto">
      <HeaderContentBanner />
      <h2 className="text-[20px] font-semibold">Livros recentes</h2>

      <div className="w-full overflow-x-auto">
        <div
          className="flex gap-6 overflow-x-auto pb-4"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {books.map((book) => {
            const user = users.find((user) => user.id === book.ownerId);

            return (
              <div
                key={book.id}
                className="flex min-w-[150px] max-w-xs flex-col items-center rounded-lg border-2 border-[#9d988b] p-4 shadow-md md:min-w-[200px]"
              >
                <img
                  src={book.images[0]}
                  alt={book.title}
                  className="mb-4 h-32 w-auto object-cover md:h-40"
                />
                <h2 className="text-lg font-bold">{book.title}</h2>
                <p className="mb-2 text-sm text-gray-500">
                  Usuário: {user ? user.user : "indefinido"}
                </p>
                <p className="font-semibold text-blue-500">
                  R$ {book.price.toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
