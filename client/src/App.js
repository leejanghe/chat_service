import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import { useEffect } from "react";
import { authService } from "./firebase";
// import { useNavigate } from "react-router-dom";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/storage";
// console.log("firebase", firebase);
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        console.log("user", user);
        //navigate

        navigate("/chat");
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<ChatPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
