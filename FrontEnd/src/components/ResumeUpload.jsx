import { useState } from "react";
import "./ResumeUpload.css"; 
import toast from "react-hot-toast";

export default function ResumeUpload({jobId}) {
  const [file, setFile] = useState("");

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


      const res = await fetch("http://localhost:8080/api/resume/upload", {
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
    <form
        onSubmit={handleSubmit}
        className="resume-card p-4 shadow-lg rounded"
      >
        <h3 className="text-center mb-4 fw-bold text-primary">
          Submit Your Resume
        </h3>


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
  );
}