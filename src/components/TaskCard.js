import React, { useEffect, useState } from "react";
import useFirestore from "../Hooks/useFirestore";
import { useAuth0 } from "@auth0/auth0-react";

const TaskCard = ({ task }) => {
  const { deleteTask, editTask } = useFirestore();
  const { user } = useAuth0();

  const [deadlineText, setDeadlineText] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const deadline = task.deadline.toDate().getTime();
      const distance = deadline - now;
      if (distance < 0) {
        setDeadlineText("Expired");
      } else if (distance < 86400000) {
        // Less than 1 day remaining
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setDeadlineText(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        // More than 1 day remaining
        const deadlineDate = task.deadline.toDate();
        setDeadlineText(deadlineDate.toLocaleString());
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [task.deadline]);

  const handleDelete = () => {
    deleteTask(task.dataKey, user.nickname);
  };

  const handleEdit = () => {
    console.log("Test");

    // This data may give error.... BUT THE EDIT FUNCTIONALITY IS WORKING. You need to just pass correct data on the place of tenpData
    const tempData = {
      name: "toedit",
      deadline: "111111111",
      tag: "qqqqq yyy",
      desc: "wwwwww",
      link: "eeeeee",
    };

    // This tempData should be updated data to be changed in DB...
    editTask(tempData, task.dataKey, user.nickname);
  };

  return (
    <div className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden mx-auto mb-8">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{task.name}</div>
        <p className="text-gray-600 mb-2">Deadline: {deadlineText}</p>
        <p className="text-gray-600 mb-2">Tags: {task.tag.join(", ")}</p>
        <p className="text-gray-600 mb-2">Description: {task.desc}</p>
        <p className="text-gray-600 mb-2">Link: {task.link}</p>
        <p className="text-gray-600">Created At: {task.createdAt.toString()}</p>
      </div>
      <div className="flex justify-between mx-4">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleEdit}>Edit</button>
      </div>
    </div>
  );
};

export default TaskCard;
