import React, { useState } from "react";
import "./Recruit.css";
import toast from "react-hot-toast";

function Recruit() {
  const [jobId, setJobId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [filters, setFilters] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          jobDescription,
          filters,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to fetch data");
      }

      const data = await response.json();
      setCandidates(data);
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to fetch candidates.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(candidates, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `candidates_${jobId || "output"}.json`;
    link.click();
  };

  return (
    <div className="resume-bg d-flex justify-content-center align-items-center min-vh-100">
      <div className="resume-card p-4 shadow">
        <h2 className="text-center mb-4 fw-bold text-primary">
          Recruitment Tool
        </h2>

        <div className="mb-3">
          <label className="form-label">Job ID</label>
          <input
            type="text"
            className="form-control"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Job Description</label>
          <textarea
            className="form-control"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Filters (comma separated)</label>
          <input
            type="text"
            className="form-control"
            value={filters}
            onChange={(e) => setFilters(e.target.value)}
          />
        </div>

        <button
          className="resume-btn w-100 mb-3"
          onClick={handleFetch}
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch Candidates"}
        </button>

        {candidates.length > 0 && (
          <div className="mt-4">
            <h3 className="text-center">Candidate List</h3>
            <ol className="list-group list-group-numbered">
              {candidates.map((c, idx) => (
                <li
                  key={c.resume_id || idx}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <b>{c.name}</b>
                    <div className="text-muted">Resume ID: {c.resume_id}</div>
                  </div>
                </li>
              ))}
            </ol>

            <button className="resume-btn w-100 mt-3" onClick={handleDownload}>
              Download Results
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recruit;
