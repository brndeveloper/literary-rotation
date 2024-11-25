import Input from "./Input";
import SendButton from "./SendButton";
import SidebarButton from "./SidebarButton";

const Sidebar = () => {
  return (
    <div className="h-screen w-4/12 min-w-[550px]">
      <div className="mr-10 space-y-4 py-6 pl-10">
        <h2 className="min-w-[550px] whitespace-normal break-words text-[52px] font-semibold">
          Rotação Literária
        </h2>
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
        <SidebarButton>Preços</SidebarButton>
        <SidebarButton>Gênero</SidebarButton>
        <SidebarButton>Estado</SidebarButton>
        <SidebarButton>Avaliação</SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
