import React, { useState } from "react";
import axios from "axios";
import "../styles/salary.css"; // Add styling

function Salary() {
  const [occupation, setOccupation] = useState("");
  const [salaryData, setSalaryData] = useState(null);
  const [error, setError] = useState("");

  const fetchSalary = async () => {
    if (!occupation.trim()) {
      setError("Please enter a valid occupation.");
      return;
    }

    setError(""); // Clear previous errors
    setSalaryData(null); // Reset data

    try {
      const response = await axios.post("http://127.0.0.1:5000/salary", {
        occupation: occupation.toLowerCase(),
      });

      console.log("Salary API Response:", response.data);
      setSalaryData(response.data);
    } catch (err) {
      console.error("Error fetching salary data:", err);
      setError("Could not fetch salary data. Try again.");
    }
  };

  return (
    <div className="salary-container">
      <h2>Salary Insights</h2>
      <p>Enter a job title to see salary trends.</p>

      <div className="input-container">
        <input
          type="text"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          placeholder="Enter job title (e.g., Software Developer)"
        />
        <button onClick={fetchSalary}>Get Salary</button>
      </div>

      {error && <p className="error">{error}</p>}

      {salaryData && (
        <div className="salary-data">
          <h3>Salary Data for {occupation}</h3>
          <ul>
            {salaryData.map((item, index) => (
              <li key={index}>
                <strong>Year:</strong> {item.year} | <strong>Salary:</strong> ${item.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Salary;
