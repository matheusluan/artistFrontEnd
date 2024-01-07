import styled from "styled-components"

export const Container = styled.div`
    margin: 0.84rem 10rem 1rem 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0 0 0;
    background: linear-gradient(180deg, #201D1D 0%, rgba(32, 29, 29, 0.2) 100%);
    border-radius: 2rem;
    width: 100%;
    max-width: 100rem;
    
    .button-submit {
        color: #FFFFFF;
        font-family: 'Nunito', sans-serif;
        font-weight: 500;
        font-size: 1.125rem;
        background: #33DDA7;
        padding: 1.75rem 5rem;
        margin: 0 0 1rem 0;
    }

    input::placeholder {
        color: #FFFFFF;
    }
`

export const ToggleWrapper = styled.div`
    
    display: flex;
    align-items: center;
    justify-content: end;
    width: 100%;
    margin: 1rem 7rem 0 0;

    .description {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1.125rem;
        padding-right: 1rem;
        color: #FFFFFF;
    }

    .switch > .hidden-toggle {
        display: none;
    }

    .switch > .slider {
        background: #e0e2db;
        border: 0.1rem solid #bbb;
        cursor: pointer;
        border-radius: 2rem;
        transition: all 300ms ease-in-out;
        width: 2rem;
        height: 1rem;
        position: relative;
        box-shadow: inset -0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.2), 0 0 1rem rgba(0, 0, 0, 0.1);
      }

    .switch > .slider > .button {
        content: "";
        position: absolute;
        width: 0.85rem;
        height: 0.85rem;
        background: #9747FF;
        top: 0.08rem;
        left: 0.08rem;
        transition: all 300ms ease-in-out;
        border-radius: 50%;
        z-index: 2;
        box-shadow: inset -0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
    }

    .switch > .hidden-toggle:checked ~ .slider {
        background: #EFF4F9;
        box-shadow: inset 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.2), 0 0 1rem rgba(50, 0, 150, 0.2);
    }
      
    .switch > .hidden-toggle:checked ~ .slider > .button {
        left: 1rem;
        box-shadow: inset 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
        background: #4CE03F;
      }
`

export const ImageContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 90%;
    padding: 0 4rem 0 4rem;
    
`