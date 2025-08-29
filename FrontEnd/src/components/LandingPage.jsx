import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  let navigate = useNavigate();

  return (
    <div className="main-bg">
      <h1 className="project-title">Hire-Flow</h1>
      <div className="buttons-container">
        <button className="user-btn" onClick={()=>{
          navigate("/user")
        }}>User</button>
        <button className="recruiter-btn" onClick={()=>{
          navigate("/recruiter")
        }}>Recruiter</button>
      </div>
    </div>
  );
};

export default LandingPage;