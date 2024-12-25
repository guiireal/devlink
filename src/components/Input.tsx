import { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="px-2 mb-3 border-0 rounded-md outline-none h-9"
      {...props}
    />
  );
}
