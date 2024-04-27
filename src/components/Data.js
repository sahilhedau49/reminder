import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IoIosNotifications } from "react-icons/io";

const Data = () => {
  const { user } = useAuth0();

  return (
    <div className="w-[80%] mx-auto my-20">
      <div className="mb-10 flex justify-between">
        <p className="text-4xl font-semibold">
          <span className="text-gray-700 font-normal">Wellcome</span>,{" "}
          {user.nickname}
        </p>
        <p className="text-4xl font-semibold content-center cursor-pointer">
          <IoIosNotifications />
        </p>
      </div>
      <div>
        {/* Here should be form, where user will enter Work Name, Date and Time, Importance Level and (links and description not Mandetory) */}
      </div>
      <div>{/* Here, all the tasked will be displayed */}</div>
    </div>
  );
};

export default Data;
