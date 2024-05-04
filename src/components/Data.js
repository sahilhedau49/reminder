import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IoIosNotifications } from "react-icons/io";
import { FaPlus, FaTimes } from "react-icons/fa"; // Importing icons
import Form from "./Form";
import Task from "./Task";

const Data = () => {
  const { user } = useAuth0();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const modalRef = useRef(null);

  const openFormModal = () => {
    setIsFormOpen(true);
  };

  const closeFormModal = () => {
    setIsFormOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeFormModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
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
        <div className="fixed bottom-8 right-8">
          <button
            onClick={openFormModal}
            className="bg-[#7743DB] h-16 w-16 center hover:bg-[#9f6dfe] transition text-white font-bold py-2 px-4 rounded-full shadow-lg text-3xl content-center"
          >
            <FaPlus />
          </button>
        </div>
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div
              ref={modalRef}
              className="bg-white rounded-lg p-8 w-1/3 relative"
            >
              <button
                onClick={closeFormModal}
                className="absolute top-4 text-xl right-4 text-gray-600 hover:text-gray-800"
              >
                <FaTimes />
              </button>
              <Form />
            </div>
          </div>
        )}
      </div>
      <div>
        <Task />
      </div>
    </div>
  );
};

export default Data;
