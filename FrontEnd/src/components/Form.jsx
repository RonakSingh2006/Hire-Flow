import React, { useState } from "react";
import "./Form.css";

const Form = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    jobId: "",
    jobTitle: "",
    responsibilities: "",
    experience: "",
    skills: "",
    summary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/jd/postjob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Job Posted Successfully ✅");
        // Optional: Clear the form after a successful submission
        setFormData({
          companyName: "",
          jobId: "",
          jobTitle: "",
          responsibilities: "",
          experience: "",
          skills: "",
          summary: "",
        });
      } else {
        const errorData = await response.json();
        alert(
          `Failed to post job: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="job-form-bg">
      <div className="job-form-card">
        <h2 className="job-form-heading">Post a Job</h2>
        <form onSubmit={handleSubmit} className="job-form">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            className="form-control"
            value={formData.companyName}
            onChange={handleChange}
            required
          />

          <label>Job ID</label>
          <input
            type="text"
            name="jobId"
            className="form-control"
            value={formData.jobId}
            onChange={handleChange}
            required
          />

          <label>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            className="form-control"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />

          <label>Responsibilities</label>
          <textarea
            name="responsibilities"
            className="form-control"
            value={formData.responsibilities}
            onChange={handleChange}
            placeholder="List main responsibilities..."
            required
          />

          <label>Experience</label>
          <input
            type="text"
            name="experience"
            className="form-control"
            value={formData.experience}
            onChange={handleChange}
            placeholder="e.g. 2+ years in software development"
            required
          />

          <label>Skills</label>
          <input
            type="text"
            name="skills"
            className="form-control"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g. Java, React, SQL"
            required
          />

          <label>Summary</label>
          <textarea
            name="summary"
            className="form-control"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Brief role description..."
            required
          />

          <button type="submit" className="job-form-btn">
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
