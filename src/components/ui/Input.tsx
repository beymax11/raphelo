import React, { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[11px] uppercase tracking-[0.15em] text-[#68645E] mb-2 font-medium"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full bg-[#E9E3D9]/40 border-b border-[#C8BDAF] px-3.5 py-3 text-sm text-[#1D1C1A] placeholder-[#68645E]/60 transition-colors duration-200 focus:outline-none focus:border-[#1D1C1A] focus:bg-[#E9E3D9]/70",
            error ? "border-red-500" : "",
            className
          )}
          {...props}
        />
        {error && <span className="text-[11px] text-red-600 mt-1.5">{error}</span>}
        {helperText && !error && (
          <span className="text-[11px] text-[#68645E] mt-1.5">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
