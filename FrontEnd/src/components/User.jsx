import { useEffect, useState } from "react";
import ResumeUpload from "./ResumeUpload";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import JobDescription from "./JobDiscription";
import "./User.css"

const User = () => {
  const { jobId } = useParams();
  const [jobsVal, setJobsVal] = useState(null);

  useEffect(() => {
    const loadJob = async () => {
      if (!jobId) {
        return;
      }
      try {
        const res = await fetch(`http://localhost:8080/api/jd/parse/${jobId}`);
        if (!res.ok) {
          toast.error("Cannot Fetch Job. HTTP status: " + res.status);
          setJobsVal({});
        } else {
          const job = await res.json();
          setJobsVal(job);
        }
      } catch (error) {
        toast.error("Error fetching job: " + error.message);
        setJobsVal({});
      }
    };
    loadJob();
  }, [jobId]);

  console.log(jobsVal);

  if (!jobsVal) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p>Loading job description...</p>
      </div>
    );
  }

  if (Object.keys(jobsVal).length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p>No job data available.</p>
      </div>
    );
  }

  return (
    <div className="flex bg">
        <JobDescription jobDetails={jobsVal}/>
        <ResumeUpload jobId={jobId} />
    </div>
  );
};

export default User;