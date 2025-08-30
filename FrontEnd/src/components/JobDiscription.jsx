import "./JobDiscription.css";

const JobDescription = ({ jobDetails }) => {
  const {
    companyName,
    experience,
    jobId,
    jobLocation,
    jobTitle,
    responsibilities,
    skills,
    summary,
  } = jobDetails;

  const responsibilityList = responsibilities.split('\n').filter(item => item.trim() !== '');
  const skillsList = skills.split(',').map(skill => skill.trim());

  return (
    <div className="job-description-container">
      <div className="job-header">
        <h1>{jobId}.{jobTitle}</h1>
        <h2>{companyName}</h2>
        <div className="job-meta">
          <span className="job-location">{jobLocation}</span>
          <span className="job-experience">{experience}</span>
        </div>
      </div>

      <div className="job-section">
        <h3>Summary</h3>
        <p>{summary}</p>
      </div>

      <div className="job-section">
        <h3>Responsibilities</h3>
        <ul>
          {responsibilityList.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>
      </div>

      <div className="job-section">
        <h3>Skills</h3>
        <div className="skills-list">
          {skillsList.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDescription;