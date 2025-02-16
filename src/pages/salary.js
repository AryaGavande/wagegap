import React, { useState, useEffect } from "react";
import axios from "axios";

const occupations = [
  'software developer',
  'nurse',
  'doctor',
  'data scientist',
  'construction worker',
  'lawyer',
  'postsecondary teacher'
];

function Salary() {
  const [salaryData, setSalaryData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllSalaryData = async () => {
      try {
        const data = {};
        for (const occupation of occupations) {
          const response = await axios.post("http://127.0.0.1:5000/salary", { occupation });
          data[occupation] = response.data;
        }
        setSalaryData(data);
        setError(null);
      } catch (err) {
        setError(err.response ? err.response.data.error : "Error connecting to server");
      }
    };

    fetchAllSalaryData();
  }, []);

  return (
    <div>
      <h2>Salary Data</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {Object.keys(salaryData).length > 0 ? (
        Object.keys(salaryData).map((occupation) => (
          <div key={occupation}>
            <h3>Salary Data for {occupation}</h3>
            <ul>
              {salaryData[occupation].map((entry, index) => (
                <li key={index}>
                  Year: {entry.year}, Wage: {entry.value}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Loading salary data...</p>
      )}
    </div>
  );
}

export default Salary;