import styled from "styled-components"

export const Container = styled.div`
    margin: 0 19rem 2rem 19rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const FormContainer = styled.div`
    background: linear-gradient(180deg, #201D1D 0%, rgba(32, 29, 29, 0.2) 100%);
    padding: 2rem 15rem 2rem 15rem;
    border-radius: 2rem;
    margin-bottom: 2rem;

    .button-submit {
        color: #FFFFFF;
        font-family: 'Nunito', sans-serif;
        font-weight: 500;
        font-size: 1.125rem;
        background: #33DDA7;
        padding: 1.75rem 5rem;
        margin: 0 0 1rem 0;
    }
`

export const InputLabelContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 2rem;

    label, input {
        margin-top: 0.875rem;
        padding: 0.3rem;
    }
`