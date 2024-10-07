"use client";

import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { error_toast, success_toast } from "@/components/toastify/Toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

const schema = z
  .object({
    first_name: z
      .string({
        required_error: "First Name field is required",
      })
      .min(4, {
        message: "First Name has to be at least 4 characters",
      }),
    last_name: z
      .string({
        required_error: "Last Name field is required",
      })
      .min(4, {
        message: "Last Name has to be at least 4 characters",
      }),
    username: z
      .string({
        required_error: "Username field is require",
      })
      .min(4, {
        message: "Username has to be at least 4 characters",
      }),
    email: z
      .string({
        required_error: "Email field is required",
        invalid_type_error: "Name must be a string",
      })
      .email({ message: "Invalid Email" })
      .toLowerCase(),
    phone_no: z.string({
      required_error: "Phone Number field is required",
    }),
    password: z
      .string({
        required_error: "Password field is required",
      })
      .min(6, {
        message: "Password has to be at least 6 characters",
      }),
    con_password: z.string({
      required_error: "Confirm Password field is required",
    }),
  })
  .refine((data) => data.password === data.con_password, {
    message: "Password doesn't match",
    path: ["con_password"],
  });

type FormData = z.infer<typeof schema>;

const SignupForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    axios
      .post(`https://sanoysi2.pythonanywhere.com/auth/users/`, data)
      .then((res) => {
        success_toast(res.statusText || "Registration Success");
        router.push("/api/auth/signin");
      })
      .catch((error) => {
        error_toast(error.message || "Something went wrong");
      });
  };

  return (
    <form
      className="mx-auto bg-slate-50 p-5 rounded-md w-full lg:w-3/4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="mb-4 font-semibold text-lg">Register</h2>

      <div className="mb-5">
        <label
          htmlFor="fname"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          First Name
        </label>
        <input
          type="text"
          id="fname"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        "
          placeholder="John Doe"
          {...register("first_name")}
        />
        {errors.first_name && (
          <p className="text-red-500 text-sm">{errors.first_name.message}</p>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="lname"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lname"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        "
          placeholder="John Doe"
          {...register("last_name")}
        />
        {errors.last_name && (
          <p className="text-red-500 text-sm">{errors.last_name.message}</p>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          User Name
        </label>
        <input
          type="text"
          id="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        "
          placeholder="username"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="email@somewhere.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Phone
        </label>
        <input
          type="number"
          id="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Phone number"
          {...register("phone_no")}
        />
        {errors.phone_no && (
          <p className="text-red-500 text-sm">{errors.phone_no.message}</p>
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

      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Consfirm Password
        </label>
        <input
          type="password"
          id="con_password"
          placeholder="************"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          {...register("con_password")}
        />
        {errors.con_password && (
          <p className="text-red-500 text-sm">{errors.con_password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="text-white bg-violet-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-100 px-5 py-2.5 text-center w-[100%]
      "
      >
        Submit
      </button>
      <div className="my-4 text-sm">
        <p>
          Already have an account?{" "}
          <a href="/api/auth/signin" className="text-violet-700">
            login
          </a>{" "}
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
