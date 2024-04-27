import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IoIosNotifications } from "react-icons/io";
import useFirestore from "../Hooks/useFirestore";
import Form from "./Form";

const Data = () => {
  const { user } = useAuth0();
  const { res, uploadTask, loading, getData } = useFirestore();

  useEffect(() => {
    getData(user.nickname);
    console.log(res);
  }, []);

  const handleSubmit = (formData) => {
    // Call the uploadTask function with formData and user.nickname
    uploadTask(formData, user.nickname);
  };

  return (
    <div className="w-[80%] mx-auto my-20">
      <div className="mb-10 flex justify-between">
        <p className="text-4xl font-semibold">
          <span className="text-gray-700 font-normal">Welcome</span>, {user.nickname}
        </p>
        <p className="text-4xl font-semibold content-center cursor-pointer">
          <IoIosNotifications />
        </p>
      </div>
      <div>
        <Form onSubmit={handleSubmit} />
        {/* Here should be form, where user will enter Work Name, Date and Time, Importance Level and (links and description not Mandatory) */}
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
        {/* List of tasks to be displayed here */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {res.map((task) => (
              <li key={task.dataKey} className="mb-4">
                <p>Name: {task.name}</p>
                <p>Deadline: {task.deadline.toString()}</p>
                <p>Tag: {task.tag.join(", ")}</p>
                <p>Description: {task.desc}</p>
                <p>Link: {task.link}</p>
                <p>Created At: {task.createdAt.toString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Data;
