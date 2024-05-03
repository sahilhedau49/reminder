import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Data from "./Data";
import Info from "./Info";

const Main = () => {
  const { isAuthenticated } = useAuth0();

  return <div >{isAuthenticated ? <Data /> : <Info />}</div>;
};

export default Main;
