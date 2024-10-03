"use client";

import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };

  useEffect(() => {
    if (status === "loading") return;
    console.log(session);
  }, [status]); // eslint-disable-line

  return (
    <div className="flex flex-col w-[50%] gap-2 mx-auto p-2">
      <div className="flex flex-col justify-center items-center border border-slate-400 rounded-md h-[200px] gap-2">
        <h1 className="text-xl font-medium">This is a Dashboard</h1>
        <form className="text-center w-full mt-2 p-2">
          <button
            type="button"
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:p-2 md:px-3"
            onClick={handleSignOut}
          >
            <div className="">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
