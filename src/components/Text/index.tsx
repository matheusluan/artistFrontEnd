import { PContainer } from './styles';


interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    props?: React.HTMLAttributes<HTMLParagraphElement>;
    fontSize: string;
    color?: string;
    textAlign?: string;
}

export function Text({ children, fontSize, color, textAlign, ...props }: TextProps) {
    return (
        <>
            <PContainer color={color} fontSize={fontSize} textAlign={textAlign}>
                {children}
            </PContainer>
        </>
    )
}
