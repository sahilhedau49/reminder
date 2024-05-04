import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaTimes, FaRegClock } from "react-icons/fa";
import useFirestore from "../Hooks/useFirestore";
import { useAuth0 } from "@auth0/auth0-react";
import Form from "./Form";

const TaskCard = ({ task }) => {
  // Destructure functions from useFirestore hook
  const { deleteTask, editTask } = useFirestore();
  const { user } = useAuth0();

  // State variables
  const [deadlineText, setDeadlineText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [cardState, setCardState] = useState(0);
  const [editedTask, setEditedTask] = useState(task); // State to hold edited task data

  // Effect to update deadline text
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const deadline = task.deadline.toDate().getTime();
      const distance = deadline - now;
      if (distance < 0) {
        setDeadlineText("Expired");
        setCardState(1); // if the card is expired (gray)
      } else if (distance < 86400000) {
        // Less than 1 day remaining
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setDeadlineText(`${hours}h ${minutes}m ${seconds}s`);
        setCardState(2); // if card is < 1 day remaining (danger/red color)
      } else {
        // More than 1 day remaining
        const deadlineDate = task.deadline.toDate();
        setDeadlineText(formatDate(deadlineDate));
        // Else same color only
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date function
  const formatDate = (date) => {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${day}${ordinalSuffix(day)} ${monthNames[monthIndex]} ${year}`;
  };

  // Ordinal suffix function
  const ordinalSuffix = (day) => {
    if (day % 10 === 1 && day !== 11) {
      return "st";
    } else if (day % 10 === 2 && day !== 12) {
      return "nd";
    } else if (day % 10 === 3 && day !== 13) {
      return "rd";
    } else {
      return "th";
    }
  };

  // Open modal function
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal function
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false); // Close edit modal too when main modal closes
  };

  // Open edit modal function
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  // Close edit modal function
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Handle delete task function
  const handleDelete = () => {
    deleteTask(task.dataKey, user.nickname);
    closeModal(); // Close modal after deleting
  };

  // Handle edit task function
  const handleEdit = (taskedited) => {
    // console.log("Calling the edit");
    // console.log(editedTask);
    // console.log(task.dataKey);
    // console.log(user.nickname);
    editTask(taskedited, task.dataKey, user.nickname); // Edit task using editedTask data
    closeModal(); // Close modal after editing
    // console.log("Done calling edit");
  };

  // Handle input change function for editing task
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value
    });
  };

  return (
    <>
      {/* Task card */}
      <div className={`w-[100%] shadow-md rounded-lg overflow-hidden mx-auto ${cardState === 1 ? "bg-gray-200" : cardState === 2 ? "bg-red-200" : "bg-[#FFFBF5]"}`} onClick={openModal}>
        <div className="px-6 py-4 h-full">
          <div className="flex justify-between items-center mb-2">
            <div className="font-bold w-[60%] text-xl mb-2">{task.name}</div>
            <div className="text-gray-600 mb-2 flex flex-row">
              <p className="mt-[5px] mr-1"><FaRegClock /></p>
              <p>{deadlineText} </p>
            </div>
          </div>
          <div className="mb-2">
            {task.tag.map((tag, index) => (
              <span key={index} className={`inline-block rounded-lg px-3 py-1 text-sm font-semibold mr-2 mb-2 ${cardState === 1 ? "bg-gray-100 text-gray-700" : "text-[#7743DB] bg-[#f5ebfb]"}`}>
                {tag}
              </span>
            ))}
          </div>
          <p className="text-black mb-2">
            <strong>Link:</strong>{" "}
            <a href={task.link} className="transition hover:text-[#0e8bff]" rel="noreferrer" target="_blank">
              {task.link}
            </a>
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 w-1/3 relative">
            <button onClick={closeModal} className="absolute text-xl top-4 right-4 text-gray-600 hover:text-gray-800">
              <FaTimes />
            </button>
            <div className="font-bold text-xl mb-2">{task.name}</div>
            <div className="text-gray-600 mb-2 flex flex-row">
              <p className="mt-[5px] mr-1 font-bold"><FaRegClock /></p>
              <strong>Deadline</strong> : <p className="ml-2">{task.deadline.toDate().toLocaleString("en-IN")}</p>
            </div>
            <div className="mb-2">
              {task.tag.map((tag, index) => (
                <span key={index} className="inline-block rounded-lg px-3 py-1 text-sm font-semibold text-[#7743DB] bg-[#f5ebfb] mr-2 mb-2">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mb-2">
              <p className="text-black font-bold mb-2">Description:<br/></p>
              <p className="text-gray-600 mb-2 overflow-y-auto max-h-60">
                {task.desc}
              </p>
            </div>
            <p className="text-black mb-2">
              <strong>Link:</strong>{" "}
              <a href={task.link} rel="noreferrer" target="_blank">{task.link}</a>
            </p>
            <div className="flex justify-between mt-4 text-xl">
              <p className="text-gray-400 text-sm">Created At: {task.createdAt.toLocaleString("en-IN")}</p>
              <div className="flex">
                <FaEdit className="text-gray-600 cursor-pointer mr-4" onClick={openEditModal} />
                <FaTrashAlt className="text-gray-600 cursor-pointer" onClick={handleDelete} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-8 w-1/3 relative">
          <button onClick={closeEditModal} className="absolute text-xl top-4 right-4 text-gray-600 hover:text-gray-800">
            <FaTimes />
          </button>
          <div className="font-bold text-xl mb-2">Edit Task</div>
          <Form taskToEdit={editedTask} onSubmit={handleEdit} />
        </div>
      </div>
      )}
    </>
  );
};

export default TaskCard;
