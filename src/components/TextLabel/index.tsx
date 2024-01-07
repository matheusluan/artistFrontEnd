
interface TextLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
    props?: React.HTMLAttributes<HTMLLabelElement>;
}

export function TextLabel({ children, ...props }: TextLabelProps) {
    return (
        <>
            <label {...props}>
                {children}
            </label>
        </>
    )
}