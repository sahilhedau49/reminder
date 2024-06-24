import React from "react";
import { ImNotification } from "react-icons/im";
import useNotification from "../Hooks/useNotification";

const InAppNotification = () => {
  const { noti, currentTime } = useNotification();

  return (
    <div>
      {noti.length === 0 ? (
        <p className="text-center text-xl font-medium text-gray-600">
          No notifications
        </p>
      ) : (
        <div className="flex flex-col gap-4 pt-4">
          {noti.map((task) => (
            <div
              className={`${
                task.deadline.toDate() - currentTime < 0
                  ? "bg-[#F7EFE5]"
                  : "bg-gray-200"
              } p-4 rounded-lg`}
            >
              <div className="flex justify-between">
                <div className="flex gap-6">
                  <p className="place-content-center text-2xl text-gray-800">
                    <ImNotification />
                  </p>
                  <div className="text-base">
                    <p>{task.name}</p>
                    <span>
                      {" "}
                      - Deadline:{" "}
                      {task.deadline.toDate().toLocaleString("en-IN")}
                    </span>{" "}
                    <span>
                      {task.deadline.toDate() - currentTime < 0
                        ? ` - Expired`
                        : ` - 24 hours remaining`}
                    </span>{" "}
                  </div>
                </div>
                <div className="place-content-center text-gray-800">
                  {task.deadline.toDate() - currentTime < 0
                    ? `${Math.ceil(
                        (currentTime - task.deadline.toDate()) / 3600000
                      )} hours ago`
                    : `${Math.floor(
                        (86400000 - (task.deadline.toDate() - currentTime)) /
                          3600000
                      )} hours ago`}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InAppNotification;
