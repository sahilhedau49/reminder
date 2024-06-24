import { useEffect, useState } from "react";
import useFirestore from "./useFirestore";
import { useAuth0 } from "@auth0/auth0-react";

const useNotification = () => {
  const [noti, setNoti] = useState([]);
  const { user } = useAuth0();
  const [currentTime, setCurrentTime] = useState();
  const [notiCount, setNotiCount] = useState(0);
  const { res, getData } = useFirestore();

  useEffect(() => {
    getData(user.nickname);
  }, []);

  useEffect(() => {
    const currentTime = new Date();
    setCurrentTime(currentTime);

    const filteredData = res.filter((task) => {
      const deadline = task.deadline.toDate().getTime();
      const gap = deadline - currentTime;
      return gap < 86400000;
    });

    const sortByHoursAgo = (task1, task2) => {
      const timeDifference1 =
        task1.deadline.toDate() - currentTime < 0
          ? Math.ceil((currentTime - task1.deadline.toDate()) / 3600000)
          : Math.floor(
              (86400000 - (task1.deadline.toDate() - currentTime)) / 3600000
            );

      const timeDifference2 =
        task2.deadline.toDate() - currentTime < 0
          ? Math.ceil((currentTime - task2.deadline.toDate()) / 3600000)
          : Math.floor(
              (86400000 - (task2.deadline.toDate() - currentTime)) / 3600000
            );

      return timeDifference1 - timeDifference2;
    };

    filteredData.sort(sortByHoursAgo);
    console.log(res);
    console.log(filteredData);
    console.log(filteredData.length);
    setNoti(filteredData);
    setNotiCount(filteredData.length);
  }, [res]);

  return {
    noti,
    notiCount,
    currentTime,
  };
};

export default useNotification;
