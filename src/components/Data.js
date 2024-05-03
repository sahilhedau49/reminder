import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IoIosNotifications } from "react-icons/io";
import useFirestore from "../Hooks/useFirestore";
import Form from "./Form";
import TaskCard from "./TaskCard";

const Data = () => {
  const { user } = useAuth0();
  const { res, loading, getData } = useFirestore();

  useEffect(() => {
    getData(user.nickname);
    console.log(res);
  }, []);

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
      <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-10">
        {loading ? (
          <p>Loading...</p>
        ) : (
          res.map((task) => <TaskCard key={task.dataKey} task={task} />)
        )}
      </div>
    </div>
  );
};

export default Data;
