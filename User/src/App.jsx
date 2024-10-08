import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./style.css";
import "./index.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { SharedProvider } from './SharedContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShared } from './SharedContext';
import EditProfile from "./components/EditProfile";
import Courses from "./components/Courses";
import CoursePage from "./components/CoursePage";
import Verify from "./components/Verify";
import VerifyEmail from "./components/VerifyEmail";
import CourseFirst from "./components/CourseFirst";
import UserCourses from "./components/UserCourses";
import About from "./components/About";


const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useShared();

  useEffect(() => {
    if (isAuthenticated && (location.pathname === '/Login' || location.pathname === '/Signup')) {
      console.log("xx : ", isAuthenticated);
      navigate('/');
    }
  }, [isAuthenticated, location, navigate]);

  // Adjusted condition for footer visibility
  const hideFooter = location.pathname.startsWith("/Course/") && 
                      !location.pathname.includes("/Course/allcourses") && 
                      !location.pathname.includes("/Course/usercourses") && 
                      !location.pathname.includes("/Course/coursefirst/");
  const hideHeader = ["/Login", "/Signup"].includes(location.pathname);

  return (
      <div className="body-container">
        {!hideHeader && <Header />}
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/Course/allcourses" element={<Courses />} />
          <Route path="/Course/usercourses" element={<UserCourses />} />
          <Route path="/Course/coursefirst/:coursebyId" element={<CourseFirst />} />
          <Route path="/Course/:coursebyId" element={<CoursePage />} />
          <Route path="/Verify" element={<Verify />} />
          <Route path="/About" element={<About />} />
          <Route path="/users/verify-token/:token" element={<VerifyEmail />} />
        </Routes>
        {!hideFooter && <Footer />}
      </div>
  );
};

const RootApp = () => (
  <BrowserRouter>
    <SharedProvider>
      <App />
    </SharedProvider>
  </BrowserRouter>
);

export default RootApp;


