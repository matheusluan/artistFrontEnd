import styled from "styled-components";

export const GaleryContainer = styled.div`
  margin: 0 auto;
  border-radius: 12px;
  max-height: 45rem;
  overflow: hidden;
  width: 100%;
  display: flex; 
  justify-content: center;

  
  img {
    max-width: 496px;
    min-height: 496px;
    
  }

 video {
    max-width: 100% !important;
    max-height: 400px;
  }

  button, svg {
    width: 30px !important;
    height: 60px !important;
  }

  .image-gallery-slide .image-gallery-image {
    width: 100%;
    object-fit: contain;
  }
`;