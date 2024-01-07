import styled from "styled-components";

export const Container = styled.div`
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
   margin-bottom: 2rem;
    
`
export const DadosContainer = styled.div`
    display: grid;
    grid-template-rows: 1fr .1fr;
    max-height: 33.25rem; 
    max-width: 60rem;
    width: 100%;
    min-width: 30rem;
    border-radius: 32px;
    background: #FFFFFF;
    color:#fff;
    background: #fff;
    padding: 30px;
    margin: 0 10rem;
    row-gap: 20px;

    .input-invalido {
        transition: 0.5s;
        background: #50e3c3 !important;
        color: #FF0000 !important;
    }

    .input {
        outline: 0;
        color: #fff;
        width: 90%;
        height: 2rem;
        border-radius: 0.5rem;
        background: #9500F6;
        padding: 5px 10px;
        border: none;
        font-size: 14px;
        font-family: Nunito;
        font-weight: bold;
        margin-bottom: 3px;
    }

    .input::placeholder {
        color: #fff;
    }

    .buttonHandle {
        width: auto;
        margin: auto auto;
        padding: 0 2rem;
        background-color: #50e3c3;
        color: #FFF;
    }

    .buttonHandle:hover {
        background-color: #9500F6;
        color: #FFF;
    }

    .avaliacoes {
        display: flex;
        justify-content: space-evenly;
    }
`

export const Dados = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
   
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

export const Avaliacoes = styled.div`
    display: grid;
    grid-template-columns: 1fr;

    width: 50%;

    
    border-radius: 8px;
    padding: 10px;
    color: #000 !important;  
`

export const ItemsAvaliacoes = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 1rem;
    padding: 5px 10px;

    img, PostAuthorAvatar { 
        width: 6rem !important;
        height: 6rem !important;
        border-radius: 50% !important;
    }

    p {
        color: #000;
    }
`

export const HeaderProfile = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    jusfity-content: space-beteen;
    padding: 15px;
    width: 100%;
    max-width: 60rem;
`

export const Left = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
  
`

export const Right = styled.div`
    
`