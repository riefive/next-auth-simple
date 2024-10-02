"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";

export async function authForAuthenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function authForSignOut(prevState: string | undefined, formData: FormData) {
  try {
    await signOut();
    redirect("/login");
  } catch (error) {
    throw error;
  }
}
