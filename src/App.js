import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
