import { useState } from "react";
import "./ResumeUpload.css"; 
import toast from "react-hot-toast";

export default function ResumeUpload() {
  const [file, setFile] = useState("");
  const [jobId, setJobId] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !jobId) {
      toast.error("Please enter Job ID and upload resume");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("jobId", jobId);


      const res = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Failed to upload");
      }
      else{
        const data = await res.text();
        toast.success("Uploaded successfully!");
        console.log("Server Response:", data);
      }
    } catch (error) {
      
      toast.error("Upload failed",error);
    }
  };

  return (
    <div className="resume-bg d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="resume-card p-4 shadow-lg rounded"
      >
        <h3 className="text-center mb-4 fw-bold text-primary">
          Submit Your Resume
        </h3>

        {/* Job ID Input */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Job ID</label>
          <input
            type="text"
            className="form-control"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            placeholder="Enter Job ID"
          />
        </div>

        {/* Resume File Input */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Upload Resume</label>
          <input
            type="file"
            className="form-control"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
          />
        </div>

        {file && (
          <div className="alert alert-success py-2 small">
            ✅ Selected: <strong>{file.name}</strong>
          </div>
        )}

        <button type="submit" className="btn resume-btn w-100">
          Submit
        </button>
      </form>
    </div>
  );
}