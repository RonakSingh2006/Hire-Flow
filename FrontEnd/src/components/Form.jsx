import React, { useState } from "react";
import "./Form.css"

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", formData);
    alert("Job Posted Successfully ✅");
  };

  return (
    <div className="job-form-container">
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <label>Company Name</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />

        <label>Job ID</label>
        <input
          type="text"
          name="jobId"
          value={formData.jobId}
          onChange={handleChange}
          required
        />

        <label>Job Title</label>
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          required
        />

        <label>Responsibilities</label>
        <textarea
          name="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          placeholder="List main responsibilities..."
          required
        />

        <label>Experience</label>
        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="e.g. 2+ years in software development"
          required
        />

        <label>Skills</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="e.g. Java, React, SQL"
          required
        />

        <label>Summary</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Brief role description..."
          required
        />

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default Form;
