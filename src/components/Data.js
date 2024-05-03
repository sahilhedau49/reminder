import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IoIosNotifications } from "react-icons/io";
import Form from "./Form";
import Task from "./Task";

const Data = () => {
  const { user } = useAuth0();

  return (
    <div className="w-[80%] mx-auto my-20">
      <div className="mb-10 flex justify-between">
        <p className="text-4xl font-semibold">
          <span className="text-gray-700 font-normal">Welcome</span>,{" "}
          {user.name}
        </p>
        <p className="text-4xl font-semibold content-center cursor-pointer">
          <IoIosNotifications />
        </p>
      </div>
      <div>
        <Form />
      </div>
      <div>
        <Task />
      </div>
    </div>
  );
};

export default Data;
