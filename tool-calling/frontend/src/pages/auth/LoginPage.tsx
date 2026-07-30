import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputComponent from "../../component/form/InputComponent";
import ButtonComponent from "../../component/ui/ButtonComponent";
import { PageTitle } from "../../component/ui/PageTitleComponent";
import { useNavigate } from "react-router";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
    navigate("/")
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-900 text-slate-100">
      <div className="flex flex-1 items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-lg flex-col justify-center rounded-3xl border border-slate-700 bg-slate-950/80 p-6 shadow-2xl shadow-black/30 sm:p-8 lg:max-w-xl lg:min-h-140">
          <div className="mb-8">
            <PageTitle
              value="Welcome back"
              className="text-2xl font-semibold text-white"
            />
            <p className="mt-2 text-sm text-slate-400">
              Sign in to your account and continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputComponent
              type="email"
              placeholder="Email"
              icon={<Mail size={18} className="text-slate-400" />}
              registration={register("email")}
              error={errors.email?.message}
            />

            <InputComponent
              type="password"
              placeholder="Password"
              icon={<Lock size={18} className="text-slate-400" />}
              registration={register("password")}
              error={errors.password?.message}
            />

            <ButtonComponent
              type="submit"
              className="w-full rounded-xl bg-cyan-500 px-4 py-3 cursor-pointer font-medium text-white transition hover:bg-cyan-400"
              label="Login"
              isSubmitting={isSubmitting}
            />

            <ButtonComponent
              type="button"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 cursor-pointer font-medium text-slate-200 transition hover:bg-slate-800"
              label="Continue with Google"
            />

            <div className="text-center text-sm text-slate-400">
              <span>New to platform?</span>{" "}
              <a
                href="/register"
                className="font-medium text-cyan-400 transition hover:text-cyan-300"
              >
                Register here
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
