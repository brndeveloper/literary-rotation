import { useEffect, useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";

const ToastWrapper = () => {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
      style={{
        bottom: "20px",
        right: "20px",
        transform: `translateY(${scrollOffset}px)`,
        position: "fixed",
        transition: "transform 0.1s ease-out",
        zIndex: 9999,
      }}
    />
  );
};

export default ToastWrapper;
