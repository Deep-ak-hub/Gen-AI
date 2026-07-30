import logo from "../../assets/images/1.png"

export const LogoComponent = ( {className} : Readonly<{className?: string}>) => {
  return (
    <>
      <div className={className}>
        <img src={logo} className="w-full" />
      </div>
    </>
  );
}