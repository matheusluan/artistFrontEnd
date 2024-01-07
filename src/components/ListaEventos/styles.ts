import styled from "styled-components";

export const Container = styled.div`
   width: 100%;

   display: grid;
   grid-template-columns: 1fr 1fr;
   grid-column-gap: 20px;
`

export const Card = styled.div`
   display: flex;
   /* width: 100%; */
   align-items: center;
   justify-content: space-around;
   border-radius: 10px;
   padding: 20px;
   background-color: #fff;

   p, h1, h2, h3, h4, h5, h6 {
      margin: 0;
      padding: 0;
      color: #000;
   }
`