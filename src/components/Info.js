import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Info = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="w-[60%] mx-auto mt-24">
      <div>
        <h1 className="text-6xl text-gray-800 font-semibold">
          Welcome to RemindMe
        </h1>
        <p className="mt-10 text-2xl font-medium text-gray-600">
          Helps you keep track of tasks so you never forget what's important 🎯
        </p>
      </div>
      <div className="w-fit mx-auto mt-20">
        <button
          onClick={() => loginWithRedirect()}
          className="px-6 py-2 text-2xl bg-purple-800 duration-200 hover:text-gray-900 hover:bg-purple-400 text-gray-100 border-2 border-gray-700 rounded-md"
        >
          Register to continue
        </button>
      </div>
    </div>
  );
};

export default Info;
