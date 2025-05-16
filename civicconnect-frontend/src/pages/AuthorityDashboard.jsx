import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AuthorityDashboard.css";

export default function AuthorityDashboard() {
  const { admin, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    if (!admin) {
      navigate("/adminlogin");
    } else {
      axios
        .get("http://localhost:5000/api/admin/issues", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setIssues(res.data))
        .catch((err) => console.error(err));
    }
  }, [admin, navigate, token]);

  const handleRespond = async (issueId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/respond/${issueId}`,
        { response: responses[issueId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Response sent successfully!");
      setResponses((prev) => ({ ...prev, [issueId]: "" }));
    } catch (error) {
      alert("Error sending response");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Authority Dashboard</h2>
      <div className="issues-list">
        {issues.map((issue) => (
          <div key={issue._id} className="issue-card">
            <h3 className="issue-title">{issue.title}</h3>
            <p className="issue-description">{issue.description}</p>
            <p><strong>Category:</strong> {issue.category}</p>
            <p><strong>Reported by:</strong> {issue.user.name} ({issue.user.email})</p>
            <p className="issue-status">
              <strong>Status:</strong> {issue.status}
            </p>

            {issue.status !== "Resolved" && (
              <>
                <textarea
                  className="response-input"
                  placeholder="Enter response"
                  value={responses[issue._id] || ""}
                  onChange={(e) =>
                    setResponses((prev) => ({
                      ...prev,
                      [issue._id]: e.target.value,
                    }))
                  }
                />
                <button
                  className="respond-button"
                  onClick={() => handleRespond(issue._id)}
                >
                  Respond
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
