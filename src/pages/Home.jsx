import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/CustomScrollbar.css";

function HomePage() {
  return (
    <div className="custom-scrollbar mx-auto flex h-screen max-w-screen-2xl flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar className="hidden h-full w-1/4 overflow-auto md:block" />
      </div>
    </div>
  );
}

export default HomePage;
