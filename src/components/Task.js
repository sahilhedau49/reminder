import React, { useEffect } from "react";
import TaskCard from "./TaskCard";
import { useAuth0 } from "@auth0/auth0-react";
import useFirestore from "../Hooks/useFirestore";

const Task = () => {
  const { res, loading, getData } = useFirestore();
  const { user } = useAuth0();

  useEffect(() => {
    getData(user.nickname);
    console.log(res);
  }, []);

  return (
    <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 mt-10">
      {loading ? (
        <p>Loading...</p>
      ) : (
        res.map((task) => <TaskCard key={task.dataKey} task={task} />)
      )}
    </div>
  );
};

export default Task;
