"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { error_toast, success_toast } from "@/components/toastify/Toastify";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import axios from "axios";

const schema = z.object({
  username: z
    .string({
      required_error: "Email field is required",
      invalid_type_error: "Name must be a string",
    })
    .toLowerCase(),
  password: z
    .string({
      required_error: "Password field is required",
    })
    .min(6, {
      message: "Password has to be at least 6 characters",
    }),
});

type FormData = z.infer<typeof schema>;

const SigninForm = () => {
  const session = useSession();
  const router = useRouter();

  if (session?.data) {
    axios
      .post(`https://sanoysi2.pythonanywhere.com/auth/jwt/verify`, {
        token: session.data.accessToken,
      })
      .then((res) => {
        if (res.status === 200) {
          router.back();
        }
      });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
      });

      if (!result?.ok) {
        error_toast(result?.error || "Something went wrong!");
      }

      if (result?.ok) {
        success_toast("Login Success!");

        const parsedUrl = new URL(result?.url || "/");
        const callbackUrl = parsedUrl.searchParams.get("callbackUrl");
        router.push(callbackUrl || "/");
      }
    } catch (error) {
      error_toast("Something went wrong!");
    }
  };

  return (
    <form
      className="mx-auto bg-slate-50 p-5 rounded-md w-full lg:w-3/4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="mb-4 font-semibold text-lg">Signin</h2>

      <div className="mb-5">
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="username"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="************"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="text-white bg-violet-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-100 px-5 py-2.5 text-center w-[100%]"
      >
        Signin
      </button>
      <div className="my-4 text-sm">
        <p>
          Don&apos;t have account?{" "}
          <a href="/api/auth/signup" className="text-violet-700">
            create
          </a>{" "}
        </p>
        <p>
          Forgot password?{" "}
          <a href="api/auth/signup" className="text-violet-700">
            reset
          </a>{" "}
        </p>
      </div>
    </form>
  );
};

export default SigninForm;
