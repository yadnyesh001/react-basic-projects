import { useState } from "react";
import { FaStar } from "react-icons/fa";
import './styles.css';

export default function StarRating({ noOfStars = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(getCurrentIndex) {
    setRating(getCurrentIndex);
    // Add subtle animation on click using scale transform
    const stars = document.querySelectorAll('.star');
    stars[getCurrentIndex - 1].style.transform = 'scale(1.2)';
    setTimeout(() => {
      stars[getCurrentIndex - 1].style.transform = 'scale(1)';
    }, 200);
  }

  function handleMouseEnter(getCurrentIndex) {
    setHover(getCurrentIndex);
  }

  function handleMouseLeave() {
    setHover(rating);
  }

  return (
    <div className="star-rating-container">
      <div className="star-rating">
        {[...Array(noOfStars)].map((_, index) => {
          index += 1;
          return (
            <FaStar
              key={index}
              className={`star ${index <= (hover || rating) ? "active" : "inactive"}`}
              onClick={() => handleClick(index)}
              onMouseMove={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave()}
              size={40}
            />
          );
        })}
      </div>
      {rating > 0 && (
        <div className="rating-text">
          You rated this {rating} star{rating > 1 ? 's' : ''}!
        </div>
      )}
    </div>
  );
}