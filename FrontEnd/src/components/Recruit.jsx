import React, { useState } from "react";
import "./Recruit.css";
import toast from "react-hot-toast";

function Recruit() {
  const [jobId, setJobId] = useState("");
  const [filters, setFilters] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/jd/uploadall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          filters,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to fetch data");
        return;
      }

      const data = await response.json();
      console.log("Raw API Response:", data);

      // 🔑 Extract text where Gemini actually puts JSON
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // 🔑 Pull out JSON block between ```json ... ```
      const match = text.match(/```json([\s\S]*?)```/);
      const jsonString = match ? match[1].trim() : text;

      let parsed = [];
      try {
        parsed = JSON.parse(jsonString);
      } catch (err) {
        console.error("Failed to parse candidate JSON:", err);
        toast.error("Could not parse candidate data.");
      }
      console.log(parsed);
      setCandidates(parsed);
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
          <label className="form-label">Filters</label>
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
              {candidates.map((c) => (
                <li
                  key={c.resume_id || c.resumeId}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <b>{c.candidate_name || c.candidateName}</b>
                    <div className="text-muted">
                      Resume ID: {c.resume_id || c.resumeId}
                    </div>
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
