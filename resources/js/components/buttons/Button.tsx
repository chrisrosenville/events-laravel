interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    variant?: 'default' | 'danger' | 'success' | 'warning';
}

export const Button = (props: ButtonProps) => {
    const { className, variant = 'default', ...rest } = props;

    const variantClasses = {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        success: 'bg-green-600 text-white hover:bg-green-700',
        warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
    };

    return (
        <button 
            className={`cursor-pointer rounded-lg px-4 py-2 shadow shadow-neutral-950/25 ${variantClasses[variant]} ${className || ''}`} 
            {...rest}
        >
            {props.children}
        </button>
    );
};
