"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, SignInResponse } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [model, setModel] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    const options = {
      email: model.email,
      password: model.password,
      redirect: false,
    };
    const res: SignInResponse = await signIn("credentials", options) as SignInResponse;
    if (res.status === 200 || res?.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <form className="flex flex-col w-[50%] mx-auto gap-2">
        <div>
          <label className="mb-3 mt-5 block text-md font-medium text-gray-900" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
              value={model.email}
              onChange={({ target }) => setModel({ ...model, email: target.value })}
            />
          </div>
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-md font-medium text-gray-900" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
                value={model.password}
                onChange={({ target }) => setModel({ ...model, password: target.value })}
              />
            </div>
          </div>
          <div className="text-center w-full mt-4">
            <button
              type="button"
              className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:p-2 md:px-3"
              onClick={onSubmit}
            >
              <div className="">Log In</div>
            </button>
          </div>
        </div>
        <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </form>
    </>
  );
}
