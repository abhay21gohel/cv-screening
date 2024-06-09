import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Compontents/Navbar";
import Main from "./Pages/Main";
import UploadCvs from "./Pages/UploadCvs";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "../APIS/apis";
import { fetchUser } from "../State/User/userAction";
import { initFlowbite } from "flowbite";
import Jobs from "./Pages/Jobs";
import Biling from "./Pages/Biling";
import Candidates from "./Pages/Candidates";

function App() {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);
  const fetchUserData = async () => {
    await dispatch(fetchUser());
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      logInUser(userInfo);
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    initFlowbite();
  }, [user]);
  return (
    <BrowserRouter>
      <Navbar />
      <div className="bg-gray-800 text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Main />} />
          {user && (
            <>
              <Route path="/upload-new-cvs" element={<UploadCvs />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/billing" element={<Biling />} />
              <Route
                path="/candidates-for-role/:role"
                element={<Candidates />}
              />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
