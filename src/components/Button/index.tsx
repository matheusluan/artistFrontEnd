import { ButtonContainer } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    textColor?: string;
}

export function Button({ children, ...props }: ButtonProps) {
    if (props.type === "submit") {
        props.textColor = "#F5F5F5"
    }

    return (
        <ButtonContainer {...props}>
            {children}
        </ButtonContainer>
    );
}