import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./styles.css";

export default function ImageSlider({ url, limit = 5, page = 1 }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);

      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      setErrorMsg(e.message);
      setLoading(false);
    }
  }

  function handlePrevious() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }

  function handleNext() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  if (loading) {
    return <div className="loading-message">Loading data! Please wait...</div>;
  }

  if (errorMsg !== null) {
    return <div className="error-message">Error occurred! {errorMsg}</div>;
  }

  return (
    <div className="slider-container">
      <BsArrowLeftCircleFill
        onClick={handlePrevious}
        className="arrow arrow-left gradient-arrow"
      />

      {images && images.length
        ? images.map((imageItem, index) => (
            <div
              key={imageItem.id}
              className={
                currentSlide === index
                  ? "slide current-slide"
                  : "slide hidden-slide"
              }
            >
              <img
                alt={imageItem.download_url}
                src={imageItem.download_url}
                className="slide-image"
              />
              <div className="image-caption">{`Image ${index + 1}`}</div>
            </div>
          ))
        : null}

      <BsArrowRightCircleFill
        onClick={handleNext}
        className="arrow arrow-right gradient-arrow"
      />

      <div className="thumbnails">
        {images && images.length
          ? images.map((imageItem, index) => (
              <img
                key={imageItem.id}
                src={imageItem.download_url}
                alt={imageItem.download_url}
                className={
                  currentSlide === index
                    ? "thumbnail active-thumbnail"
                    : "thumbnail"
                }
                onClick={() => setCurrentSlide(index)}
              />
            ))
          : null}
      </div>

      <span className="circle-indicators">
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                className={
                  currentSlide === index
                    ? "indicator active-indicator"
                    : "indicator"
                }
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
}
