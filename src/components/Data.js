import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IoIosNotifications } from "react-icons/io";
import { FaPlus, FaTimes } from "react-icons/fa"; // Importing icons
import Form from "./Form";
import Task from "./Task";
import useFirestore from "../Hooks/useFirestore";
import InAppNotification from "./InAppNotification";

const Data = () => {
  const { user } = useAuth0();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const { res, getData } = useFirestore();
  const modalRef = useRef(null);

  useEffect(() => {
    getData(user.nickname);
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
          <span className="text-gray-700 font-normal">Welcome</span>,{" "}
          {user.name}
        </p>
        <p
          className="text-4xl font-semibold content-center cursor-pointer"
          onClick={() => {
            setIsNotiOpen(true);
          }}
        >
          <IoIosNotifications />
        </p>
      </div>
      <div>
        <div className="fixed bottom-8 right-8">
          <button
            onClick={openFormModal}
            className="bg-[#7743DB] h-16 w-16 hover:bg-[#9f6dfe] transition text-white font-bold rounded-full shadow-lg text-3xl"
          >
            <FaPlus className="mx-auto" />
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
      <div>
        {isNotiOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 w-1/2 relative">
              <button
                onClick={() => {
                  setIsNotiOpen(false);
                }}
                className="absolute top-4 text-xl right-4 text-gray-600 hover:text-gray-800"
              >
                <FaTimes />
              </button>
              <InAppNotification data={res} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Data;
