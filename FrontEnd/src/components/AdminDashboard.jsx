import { useState } from "react";
import "./AdminDashboard.css";
import Recruit from "./Recruit"
import Form from "./Form"


const AdminDashboard = () => {
  const [view, setView] = useState("resumeScreening");

  return (
    <div className="recruiter-dashboard-container">
      <nav className="navbar">
        <div className="nav-item-container">
          <button
            className={`nav-item ${view === "resumeScreening" ? "active" : ""}`}
            onClick={() => setView("resumeScreening")}
          >
            Job Screening
          </button>
          <button
            className={`nav-item ${view === "postJob" ? "active" : ""}`}
            onClick={() => setView("postJob")}
          >
            Post a Job
          </button>
        </div>
      </nav>
        {view === "resumeScreening" ? (
            <Recruit/>
          ) : (
            <Form/>
          )}
    </div>
  );
};

export default AdminDashboard;
