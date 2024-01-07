import styled from "styled-components";


export const Container = styled.div`
    .modal {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        display: flex;
        background-color: #fff;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 20px;
        border-radius: 2rem;
    }

    .modal-body {
        display: flex;
        margin-top: 1rem;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 15px;
        /* width: 250px; */
    }

    .modal-close {
        color: black;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
    }
`

export const NewPost = styled.div`
    align-self: center;
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

export const Event = styled.div`
`

export const Select = styled.select`
    width: 90%;
    height: 3.125rem;
    border-radius: 0.5rem;
    background: #E5E5E5;
    border-style: none;
    outline: 0;
`