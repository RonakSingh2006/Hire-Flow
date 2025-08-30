import { useState } from "react";
import "./AdminDashboard.css";
import Recruit from "./Recruit";
import Form from "./Form";
import ResumeUploadAdmin from "./ResumeUploadAdmin";

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
            Resume Screening
          </button>
          <button
            className={`nav-item ${view === "postJob" ? "active" : ""}`}
            onClick={() => setView("postJob")}
          >
            Post a Job
          </button>
          <button
            className={`nav-item ${view === "resumeUpload" ? "active" : ""}`}
            onClick={() => setView("resumeUpload")}
          >
            Resume Upload
          </button>
        </div>
      </nav>
      {view === "resumeScreening" ? (
        <Recruit />
      ) : view === "postJob" ? (
        <Form />
      ) : (
        <ResumeUploadAdmin />
      )}
    </div>
  );
};

export default AdminDashboard;
