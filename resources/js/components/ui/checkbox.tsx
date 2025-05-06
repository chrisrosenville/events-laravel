import * as React from "react";
import { FaCheck } from "react-icons/fa";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    const [checked, setChecked] = React.useState(props.defaultChecked || false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Combine the forwarded ref with our internal ref
    React.useImperativeHandle(ref, () => inputRef.current!);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
      props.onChange?.(event);
    };

    const handleClick = () => {
      if (props.disabled) return;

      inputRef.current?.click();

      setChecked(!checked);
    };

    return (
      <div className="flex items-center space-x-2">
        <div className="relative">
          <input
            ref={inputRef}
            type="checkbox"
            className="peer sr-only"
            checked={checked}
            {...props}
            onChange={handleChange}
          />
          <div
            onClick={handleClick}
            className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary ring-offset-background peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 cursor-pointer",
              checked ? "bg-primary text-primary-foreground" : "bg-background",
              className
            )}
            aria-hidden="true"
          >
            {checked && <FaCheck className="h-3 w-3" />}
          </div>
        </div>
        {label && (
          <label
            className="text-sm font-medium leading-none cursor-pointer"
            onClick={props.disabled ? undefined : handleClick}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };