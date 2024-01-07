import styled from "styled-components";

export const Container = styled.div`
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
`
export const DadosContainer = styled.div`
    display: flex;
    max-height: 33.25rem;
    min-height: 24rem; 
    max-width: 60rem;
    width: 100%;
    min-width: 30rem;
    border-radius: 32px;
    color:#fff;
    padding: 30px;
    margin: 0 10rem;
    column-gap: 20px;
`

export const CardArtist = styled.div`
    display: grid;
    grid-template-rows: 1fr;
    width:15rem;
    height:4rem;
    border-radius: 8px;
    padding: 10px;
    background: #ededed;
    color: #000 !important;    
`
export const CardHeader = styled.div`
    display: grid;
    grid-template-columns: .3fr 2fr .3fr;
    padding:5px;
    align-items:center;
    column-gap: 10px;
`
export const Imagem = styled.img`
    width:2rem;
    height:2rem;
    border-radius: 50%;
`

export const Btn = styled.div`
    width:2rem;
    height:2rem;
    border-radius: 50%;
    background: tomato;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;


`