import React from "react";

interface IPageTitleProps {
  value?: string;
  className?: string;
  children?: React.ReactNode;
}

export const PageTitle = ({
  value,
  className = "text-gray-50",
  children = "",
}: Readonly<IPageTitleProps>) => {
  return (
    <>
      <h3 className={`text-2xl  ${className}`}>
        {children ? children : value ? value : ""}
      </h3>
    </>
  );
};
