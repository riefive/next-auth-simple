"use client";

import React from "react";
import { useActionState } from "react";
import { signOut } from "next-auth/react";
import { authForAuthenticate } from "@/libs/auth.action";

const Login = () => {
  const [errorMessage, formAction, isPending] = useActionState(authForAuthenticate, undefined);

  return (
    <>
      <form action={formAction}>
        <div>
          <input id="email" type="email" name="email" placeholder="Enter your email address" required />
          <br />
          <button
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            type="submit"
          >
            Sign In
          </button>
        </div>
        <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </form>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
    </>
  );
};

export default Login;
