import React, { useEffect } from "react";
import { Container } from "./styles";
import { Text } from "../Text";
import { pxToRem } from "../../utils/convertToRem.util";

type AccountModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function AccountModal({ isOpen, onClose, children }: AccountModalProps) {

    const name = localStorage.getItem('name');
    const nameFormated = name ? name.charAt(0).toUpperCase() + name.slice(1) : '';

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if ((event.target as HTMLElement).classList.contains('modal')) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <Container>
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <Text fontSize={pxToRem(28)}>Olá {nameFormated}</Text>
                        <button className="modal-close" onClick={onClose}>
                            X
                        </button>
                    </div>
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </Container>
    );
}