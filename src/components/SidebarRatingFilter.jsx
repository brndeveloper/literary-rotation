import PropTypes from "prop-types";
import { useState } from "react";

const SidebarRatingFilter = ({ maxStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    // ainda como placeholder
    <div className="flex items-center">
      <span className="mr-2 font-semibold">Avaliação</span>
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;

        return (
          <svg
            key={starValue}
            className={`h-8 w-8 cursor-pointer ${
              starValue <= (hover || rating)
                ? "text-[#5a524d]"
                : "text-[#9d988b]"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(starValue)}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.392-2.46a1 1 0 00-1.176 0l-3.392 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.343 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
          </svg>
        );
      })}
    </div>
  );
};

SidebarRatingFilter.propTypes = {
  maxStars: PropTypes.number,
};

export default SidebarRatingFilter;
