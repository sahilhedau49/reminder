import {
  doc,
  setDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const useFirestore = () => {
  const [loading, setLoading] = useState(true);
  const [res, setRes] = useState([]);

  const uploadTask = async (data, id) => {
    const docId = uuidv4();
    await setDoc(doc(db, "userData", id, "data", docId), {
      name: data.name,
      deadline: data.deadline, // need update
      tag: data.tag,
      desc: data.desc,
      link: data.link,
      createdAt: new Date(),
    });
  };

  const deleteTask = async (dataKey, id) => {
    try {
      await deleteDoc(doc(db, "userData", id, "data", dataKey));
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async (id) => {
    try {
      const q = query(
        collection(db, "userData", id),
        orderBy("createdAt", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        const d = [];
        querySnapshot.forEach((data) => {
          const dataKey = doc.id;
          const name = doc.data().name;
          const deadline = doc.data().deadline;
          const tag = doc.data().tag;
          const link = doc.data().link;
          const desc = doc.data().desc;
          const createdAt = doc.data().createdAt.toDate();
          d.push({ dataKey, name, deadline, tag, link, desc, createdAt });
        });
        setRes(d);
        setLoading(false);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    res,
    uploadTask,
    loading,
    deleteTask,
    getData,
  };
};

export default useFirestore;
