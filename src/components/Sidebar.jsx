import "../styles/CustomScrollbar.css";
import Input from "./Input";
import SendButton from "./SendButton";
import SidebarConditionFilter from "./SidebarConditionFilter";
import SideBarGenreFilter from "./SidebarGenreFilter";
import SidebarPriceFilter from "./SidebarPriceFilter";
import SidebarRatingFilter from "./SidebarRatingFilter";

const Sidebar = () => {
  return (
    <div className="custom-scrollbar h-screen min-w-[400px] max-w-[400px] overflow-y-auto overflow-x-hidden xl:min-w-[550px] xl:max-w-[550px]">
      <div className="mr-10 space-y-4 py-6 pl-10">
        <h1 className="min-w-[550px] whitespace-normal break-words text-[36px] font-semibold xl:text-[52px]">
          Rotação Literária
        </h1>
        <p className="text-justify">
          Rotação Literária é o espaço perfeito para leitores apaixonados por
          livros, onde você pode compartilhar, trocar e descobrir novas
          histórias, promovendo uma comunidade de trocas literárias que
          incentiva a leitura, a sustentabilidade e o amor por novas aventuras
          literárias.
        </p>
        <div className="flex items-center space-x-2">
          <Input placeholder="Buscar livro..." />
          <SendButton />
        </div>
        <SideBarGenreFilter />
        <SidebarConditionFilter />
        <SidebarPriceFilter />
        <SidebarRatingFilter />
      </div>
    </div>
  );
};

export default Sidebar;
