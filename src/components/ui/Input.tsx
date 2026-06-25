import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, type = "text", ...props }, ref) => {
    return (
      <div className="flex flex-col w-full gap-1.5 text-left">
        {label && (
          <label className="text-sm font-medium text-pd-text select-none">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={`flex h-12 w-full rounded-xl border border-pd-border bg-white px-4 text-base transition-all duration-200 outline-none placeholder:text-pd-muted/60 focus:border-pd-green-700 focus:ring-1 focus:ring-pd-green-700 disabled:opacity-50 disabled:bg-pd-cream-50 ${
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
          } ${className}`}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500 font-sans mt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
