import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import { useEffect } from "react";
import { authService } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "./redux/actions/user_action";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        console.log("user", user);
        navigate("/");
        dispatch(setUser(user));
      } else {
        navigate("/login");
        dispatch(clearUser());
      }
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    );
  }
}

export default App;
