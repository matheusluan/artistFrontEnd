import styled from "styled-components";

export const Container = styled.div`
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
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
export const DadosContainer = styled.div`
    display: grid;
    grid-template-rows: .1 1fr ;
    max-height: 35rem; 
    max-width: 60rem;
    width:100%;
    min-width: 30rem;
    border-radius: 32px;
    background: #FFFFFF;
    color:#fff;    
    padding: 30px;
    margin: 20px 10rem;
    row-gap: 10px;
`

export const Dados = styled.div`

`

export const Titulo = styled.h3`
    color: #000;
    font: 16px 700 Nunito;
`

export const EditPost = styled.div`
    margin: 10px;
 `

export const FormContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: space-between;
    background: #FFFFFF;
    border-radius: 2rem;
    padding: 0.5rem 2.5rem 1rem 2.5rem;
    align-self: left;
`

export const ImportFiles = styled.label`
    color: #41D773;
    font-family: Nunito;
    cursor: pointer;
`

export const NewEvent = styled.a`
    color: #41D773;
    font-family: Nunito;
    margin-left: 70%;
    cursor: pointer;
`

export const Line = styled.hr`
    size: 50;
    width: 95%;
    align: center;
    border: 0;
    border-top: 2px solid #41D773;
`

export const Descr = styled.textarea`
    outline: 0;
    height: 6.25rem;
    border-radius: 0.5rem;
    background: #E5E5E5;
    border-style: none;
    resize: none;
    padding: 1.25rem;
    align-self: center;
    grid-column-start: 1;
    grid-column-end: 3;
    color: #000000;
`

export const Files = styled.div`
    margin: 10px 0;
`

export const Select = styled.select`
    width: 90%;
    height: 3.125rem;
    border-radius: 0.5rem;
    background: #E5E5E5;
    border-style: none;
    outline: 0;
`
export const Event = styled.div`
    margin: 10px 0;
`
export const AddEvento = styled.label`
    color: #41D773;
    font-family: Nunito;
    cursor: pointer;
`