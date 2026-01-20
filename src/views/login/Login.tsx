"use client";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { loginWithEmail } from "@/lib/loginWithEmail";
import { mainBgColor } from "@/utils/colors";
import { useState } from "react";
import { Loader } from "@/components";

type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const token = await loginWithEmail({ email, password });
      setIsLoading(false);

      if (token) {
        router.replace("/");
      }
    } catch (error) {
      console.log("error ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={clsx(
        "h-dvh",
        "grow",
        "flex",
        "items-center",
        "justify-center",
        mainBgColor,
      )}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-2xl rounded-4xl p-6 bg-white shadow-xl flex flex-col gap-4.5"
      >
        <h1 className="text-center">Login</h1>
        <div className="relative">
          <input
            placeholder="Email"
            className="px-2 h-9 w-full rounded-3xl border border-slate-400 placeholder:text-slate-750 text-slate-950"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500 text-xs  absolute left-0 -bottom-4">
              This field is required
            </span>
          )}
        </div>

        <div className="relative">
          <input
            placeholder="Password"
            type="password"
            className="px-2 h-9 w-full rounded-3xl border border-slate-400 placeholder:text-slate-750 text-slate-950"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500 text-xs  absolute left-0 -bottom-4">
              This field is required
            </span>
          )}
        </div>

        <Link href={"/signup"} className="text-blue-400">
          Don't have an account? Create one.
        </Link>

        <button
          type="submit"
          className="px-2 h-9 bg-green-400 cursor-pointer rounded-3xl text-slate-50 flex justify-center items-center disabled:bg-green-200"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Submit"}
        </button>
      </form>
    </div>
  );
};
