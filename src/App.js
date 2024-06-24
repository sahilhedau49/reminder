import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
