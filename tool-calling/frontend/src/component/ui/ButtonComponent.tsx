import React from "react";

export interface ButtonComponentProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  label?: string;
  placeholder?: string;
  isSubmitting?: boolean;
  isStreaming?: boolean;
  stopLabel?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onStop?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ButtonComponent({
  type = "button",
  className = "",
  children,
  icon,
  label,
  placeholder,
  isSubmitting = false,
  isStreaming = false,
  stopLabel = "Stop",
  onClick,
  onStop,
}: ButtonComponentProps) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (isStreaming) {
      if (onStop) {
        onStop(event);
        return;
      }
    }
    onClick?.(event);
  };

  return (
    <button
      type={type}
      className={className}
      disabled={isSubmitting && !isStreaming}
      onClick={handleClick}
    >
      {icon}
      {isStreaming ? stopLabel : children ?? label ?? placeholder}
    </button>
  );
}
