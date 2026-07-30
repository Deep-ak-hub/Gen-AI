import { LogoComponent } from "../ui/LogoComponent";

export default function AuthLeftSidePanel() {
  return (
    <div className="w-72 md:w-80 h-screen bg-linear-to-br from-slate-950 via-cyan-700 to-violet-600 flex flex-col items-center justify-center px-6">
      <LogoComponent className="bg-transparent/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl w-32 h-32 sm:w-40 sm:h-40 " />

      <div className="text-center font-semibold text-cyan-100 mt-6">
        <h3 className="text-lg sm:text-xl tracking-wide">
         Beyond Chat. Beyond AI.
        </h3>
      </div>
    </div>
  );
}