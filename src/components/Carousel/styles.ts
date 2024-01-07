import styled from "styled-components";

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 8px;
`;

export const CarouselContent = styled.div<{ translateX: number }>`
  display: flex;
  transform: ${({ translateX }) => `translateX(-${translateX}px)`};
  transition: transform 0.3s ease;
`;

export const CarouselImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

export const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  outline: none;

  &:first-child {
    left: 10px;
  }

  &:last-child {
    right: 10px;
  }
`;
