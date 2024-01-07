import styled from "styled-components";

export const Container = styled.div`
    padding: 0 10rem;
    
`

export const CardArtist = styled.div`
    display: grid;
    grid-template-rows: 1fr .1fr;
    padding: 20px;
    max-width: 48rem;
    min-width: 30rem;
    width: 100%;
    border-radius: 32px;
    background: #FFFFFF;
    color:#fff;
    margin: 0 auto;

`

export const RedeSocial = styled.div<{ cor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  border-radius: 8px;
  width: 30px;
  height: 30px;
  padding: 5px;
  cursor: pointer;
  transition: 1s;

  &:hover {
    opacity: 1.8;
    color: #fff;
    background: ${props => props.cor};
  }
`;