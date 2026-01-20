"use client";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { registrationUser } from "@/lib/registrationUser";
import { mainBgColor } from "@/utils/colors";
import { Loader } from "@/components";
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
  username: string;
  displayName: string;
};

export const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async ({
    email,
    password,
    username,
    displayName,
  }) => {
    setIsLoading(true);
    try {
      await registrationUser({ email, password, username, displayName });
      setIsLoading(false);
      router.replace("/");
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
        <h1 className="text-center">Registration</h1>

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
            className="px-2 h-9 w-full rounded-3xl border border-slate-400 placeholder:text-slate-750 text-slate-950"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500 text-xs  absolute left-0 -bottom-4">
              This field is required
            </span>
          )}
        </div>

        <div className="relative">
          <input
            placeholder="Display name"
            className="px-2 h-9 w-full rounded-3xl border border-slate-400 placeholder:text-slate-750 text-slate-950"
            {...register("displayName", { required: true })}
          />
          {errors.displayName && (
            <span className="text-red-500 text-xs  absolute left-0 -bottom-4">
              This field is required
            </span>
          )}
        </div>

        <div className="relative">
          <input
            placeholder="Username"
            className="px-2 h-9 w-full rounded-3xl border border-slate-400 placeholder:text-slate-750 text-slate-950"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <span className="text-red-500 text-xs  absolute left-0 -bottom-4">
              This field is required
            </span>
          )}
        </div>

        <Link href={"/login"} className="text-blue-400">
          Login to account
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
