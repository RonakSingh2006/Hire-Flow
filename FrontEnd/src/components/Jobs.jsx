import { FaArrowRight } from "react-icons/fa";
import "./Jobs.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/jobs/getall");
        if (!response.ok) {
          toast.error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data);
      } catch (e) {
        setError("Failed to fetch jobs. Please try again later.");
        toast.error("Fetching error: ", e);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="resume-bg">
        <div className="resume-card">
          <p>Loading job openings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="resume-bg">
        <div className="resume-card">
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="resume-bg">
      <div className="resume-card">
        <h2 className="heading">Job Openings</h2>
        <div className="list-group">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <div
                key={index}
                className="job-item d-flex justify-content-between align-items-center"
              >
                <div className="flex">
                  <h5 className="job-title">{job.jobTitle}</h5>
                  <p className="job-location mb-0">{job.jobLocation}</p>
                </div>
                <button className="arrow-btn" onClick = {()=>{
                  navigate(`/userComp/${job.jobId}`);
                }}>
                  <FaArrowRight />
                </button>
              </div>
            ))
          ) : (
            <p className="no-jobs-message">No job openings available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}