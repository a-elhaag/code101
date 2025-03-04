import React from "react";

const Button = ({ size = "md", color = "blue", children, onClick }) => {
  const sizeClasses = {
    lg: "padding: 12px 24px; font-size: 18px;",
    md: "padding: 10px 20px; font-size: 16px;",
    sm: "padding: 8px 16px; font-size: 14px;",
  };

  const colorClasses = {
    black: "background-color: var(--color-black); color: var(--color-white); border: 1px solid var(--color-white);",
    white: "background-color: var(--color-white); color: var(--color-black); border: 1px solid var(--color-black);",
    blue: "background-color: var(--color-blue); color: var(--color-white); border: 1px solid var(--color-blue);",
  };

  return (
    <button
      style={{
        borderRadius: "6px",
        transition: "all 0.3s ease",
        cursor: "pointer",
        ...sizeClasses[size].split(";").reduce((acc, rule) => {
          const [key, value] = rule.split(":").map((s) => s.trim());
          if (key) acc[key] = value;
          return acc;
        }, {}),
        ...colorClasses[color].split(";").reduce((acc, rule) => {
          const [key, value] = rule.split(":").map((s) => s.trim());
          if (key) acc[key] = value;
          return acc;
        }, {}),
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;