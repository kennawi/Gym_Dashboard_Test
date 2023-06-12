import React, { HTMLAttributes, ReactNode } from "react";

export interface IButton extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  error?: boolean;
  success?: boolean;
  md?: boolean;
  onClick?: () => void;
}

const Button: React.FC<IButton> = ({
  children,
  error,
  onClick,
  success,
  type,
}) => {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={`
    ${
      success
        ? "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        : error
        ? "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        : "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    }
    `}
    >
      {children}
    </button>
  );
};

export default Button;
