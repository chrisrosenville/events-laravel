interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
    const { className, ...rest } = props;

    return (
        <button className={`cursor-pointer rounded-lg px-4 py-2 shadow shadow-neutral-950/25 ${className}`} {...rest}>
            {props.children}
        </button>
    );
};
