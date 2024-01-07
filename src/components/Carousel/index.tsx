import { IMedia } from "../../interfaces/IMedia";
import { CarouselButton, CarouselContainer, CarouselContent, CarouselImage } from "./styles";
import React, { useState } from 'react';

interface CarouselProps {
    images: IMedia[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [counter, setCounter] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const size = images.length;
  
    const handlePrev = () => {
      if (counter <= 0) return;
      setCounter(counter - 1);
      setTranslateX(translateX + 100);
    };
  
    const handleNext = () => {
      if (counter >= size - 1) return;
      setCounter(counter + 1);
      setTranslateX(translateX - 100);
    };
  
    return (
      <CarouselContainer>
        <CarouselContent translateX={translateX}>
          {images.map((image, index) => (
            <CarouselImage key={index} src={'http://localhost:3333/api/v1/images/'+image.name} />
          ))}
        </CarouselContent>
        <CarouselButton onClick={handlePrev}>&#171;</CarouselButton>
        <CarouselButton onClick={handleNext}>&#187;</CarouselButton>
      </CarouselContainer>
    );
  };
  
  export default Carousel;