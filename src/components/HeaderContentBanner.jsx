import bannerImage from "../assets/images/banner-placeholder.jpg";

const HeaderContentBanner = () => {
  return (
    <div className="-mt-[54px] w-full">
      <img
        src={bannerImage}
        alt="Banner do site"
        className="h-[300px] w-full rounded-lg object-cover shadow-lg"
      />
    </div>
  );
};

export default HeaderContentBanner;
