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
        border-radius: 5px;
    }

    .modal-header {
        /* position: absolute; */
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        gap: 10px;

        width: 100%;
    }

    .modal-body {
        display: flex;
        margin-top: 1rem;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 15px;
        width: 250px;
    }

    .modal-close {
        color: black;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
    }
`