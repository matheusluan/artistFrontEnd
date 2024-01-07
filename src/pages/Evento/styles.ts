import styled from "styled-components";

export const Container = styled.div`
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
`
export const DadosContainer = styled.div`
    display: grid;
    grid-template-rows: .1 1fr 1fr .2fr; 
    max-width: 60rem;
    width:100%;
    min-width: 30rem;
    border-radius: 32px;
    background: #FFFFFF;
    color:#fff;    
    padding: 30px;
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
    margin: 15px 0;
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
    min-height: 5rem;
    
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
export const H1 = styled.h1`
    display: block;
    font-size: 2rem;
    font-family: Nunito;
    font-weight: bold;
    color: #fff;
    max-width: 60rem;
    margin: 5px 11rem;
    width:100%;
`



export const AddressContainer = styled.div`
    display: grid;
    padding: 10px 15px; 
    width: 95%;
    border-radius: 8px;
    box-shadow: 0px 0px 8px black;
    grid-template-row: .1fr 1fr;
`


export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;

export const Column = styled.div<{ spanAll?: boolean }>`
  grid-column: ${({ spanAll }) => (spanAll ? '1 / -1' : 'auto')};
`;