import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IoIosNotifications } from "react-icons/io";
import { FaPlus, FaTimes } from "react-icons/fa"; // Importing icons
import useFirestore from "../Hooks/useFirestore";
import TaskCard from "./TaskCard";
import Form from "./Form";

const Data = () => {
  const { user } = useAuth0();
  const { res, loading, getData } = useFirestore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    getData(user.nickname);
    console.log(res);
  }, []);

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
          <span className="text-gray-700 font-normal">Welcome</span>, {user.name}
        </p>
        <p className="text-4xl font-semibold content-center cursor-pointer"  >
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
            <div ref={modalRef} className="bg-white rounded-lg p-8 max-w-md relative">
              <button
                onClick={closeFormModal}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                <FaTimes /> 
              </button>
              <Form />
            </div>
          </div>
        )}
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
