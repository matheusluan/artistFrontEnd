import styled from 'styled-components';


export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

export const ModalWrapper = styled.div`
  border-radius: 32px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1rem;
  z-index: 11;
`;

export const ModalContent = styled.div`
  padding: 5px 0;
`;

export const DadosContainer = styled.div`
    display: grid;
    grid-template-rows: .1 1fr 1fr .1fr;
    border-radius: 32px;
    color:#fff;   
    padding: 20px;
    row-gap: 10px;
`

export const Dados = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
`

export const Titulo = styled.h3`
    color: #000
`

export const CategoryContainer = styled.div`
    display: grid;
    padding: 0 15px;
    width: 95%;
    border-radius: 8px;
    box-shadow: 0px 0px 8px black;
    grid-template-row: .1fr 1fr;
`
export const AddressContainer = styled.div`
    display: grid;
    padding: 10px 15px; 
    width: 95%;
    border-radius: 8px;
    box-shadow: 0px 0px 8px black;
    grid-template-row: .1fr 1fr;
`
export const Categorias = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    border-radius: 8px;
    min-height: 2rem;
`

export const ItemCategory = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    margin: 5px;
    height: 30px;
    border-radius: 8px;
    font-weight: 700;
    font-family: 'Roboto', sans-serif;
    color: black;
    cursor:pointer;
`

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;

export const Column = styled.div<{ spanAll?: boolean }>`
  grid-column: ${({ spanAll }) => (spanAll ? '1 / -1' : 'auto')};
`;