import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import UserProgress from "./pages/UserProgress.jsx";
import UserDetailForm from "./pages/UserDetailForm.jsx";
import AdminPanel from "./pages/Dashboard/Admin/AdminPanel.jsx";
import UserTicket from "./pages/Dashboard/Admin/UserTicket.jsx";
import Dashboard from "./pages/Dashboard/Admin/Dashboard.jsx";
import FitnessCoach from "./pages/Dashboard/User/FitnessCoach.jsx";
import Users from "./pages/Dashboard/Admin/Users.jsx";
import AdminHome from "./pages/Dashboard/Admin/Home.jsx";
import Requests from "./pages/Dashboard/Admin/Requests.jsx";
import SingleUser from "./pages/Dashboard/Admin/SingleUser.jsx";
import RaiseRequest from "./components/RaiseRequest.jsx";
// import { useSelector } from "react-redux";
import Protectedroutes from "./components/Protectedroutes.jsx";

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/UserDetailForm" element={<UserDetailForm />} />

          <Route path="/super" element={<AdminPanel />} />
          <Route path="/super/ut" element={<UserTicket />} />
          <Route path="/dashboard/admin" element={<Protectedroutes><Dashboard /></Protectedroutes>} >
            <Route index element={<Protectedroutes><AdminHome /></Protectedroutes>} />
            <Route path="users" element={<Protectedroutes><Users /></Protectedroutes>} />
            <Route path="users/:id" element={<Protectedroutes><SingleUser /></Protectedroutes>} />
            <Route path="requests" element={<Protectedroutes><Requests /></Protectedroutes>} />
          </Route>

          <Route path="/UserProfile" element={<Protectedroutes><UserProfile /></Protectedroutes>} />
          
          <Route path="/fitness" element={<Protectedroutes><FitnessCoach /></Protectedroutes>} />
          <Route path="/raiseRequest" element={<Protectedroutes><RaiseRequest /></Protectedroutes>} />

        </Routes>
      </Router>
    </>
  );
};

export default App;
