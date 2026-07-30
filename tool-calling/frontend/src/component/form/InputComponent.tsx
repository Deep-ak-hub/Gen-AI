import type { UseFormRegisterReturn } from "react-hook-form";

interface IInputComponentProps {
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  registration: UseFormRegisterReturn;
  error?: string;
  className?: string;
}

export default function InputComponent({
  type,
  placeholder,
  icon,
  registration,
  error,
  className = "",
}: IInputComponentProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center border border-gray-300 rounded px-3 py-2">
        {icon && <span className="mr-2">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          {...registration}
          className={`outline-none flex-1 ${className}`}
        />
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}
