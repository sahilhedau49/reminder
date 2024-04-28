import React, { useEffect, useState } from "react";

const TaskCard = ({ task }) => {
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
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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
    </div>
  );
};

export default TaskCard;
