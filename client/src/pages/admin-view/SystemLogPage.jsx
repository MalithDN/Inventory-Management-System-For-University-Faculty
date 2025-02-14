import { useEffect, useState } from "react";

function SystemLogPage() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  // Fetch system logs when the component mounts
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/system-logs");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setLogs(data.logs);  // Update state with fetched logs
        } else {
          setError("Failed to fetch logs.");
        }
      } catch (error) {
        setError(error.message); // Set the error message for display
      }
    };

    fetchLogs();
  }, []); // Empty dependency array ensures this only runs once on component mount

  // Styles for the table and page
  const containerStyle = {
    padding: '20px',
  };

  const headingStyle = {
    textAlign: 'left',  // Aligns the text to the right
    fontSize: '1.5rem',
    marginBottom: '20px',
    fontWeight: '500',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const headerStyle = {
    backgroundColor: '#f9f9f9',
    color: '#333',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
    whiteSpace: 'nowrap', // Prevent text wrapping in the header
  };

  const cellStyle = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #f0f0f0',
    color: '#555',
    wordWrap: 'break-word', // Allow long text to break into multiple lines
  };

  const timestampColumnStyle = {
    ...cellStyle,
    width: '20%',  // Set the width for the timestamp column
  };

  const actionColumnStyle = {
    ...cellStyle,
    width: '20%',  // Set the width for the action column
  };

  const detailsColumnStyle = {
    ...cellStyle,
    width: '60%',  // Expand the details column to fill the remaining space
    whiteSpace: 'pre-wrap',  // Allow wrapping of the text in the details column
  };

  const rowHoverStyle = {
    backgroundColor: '#fafafa',
  };

  const detailsContainerStyle = {
    padding: '10px',
    backgroundColor: '#f2f2f2',
    margin: '5px 0',
    borderRadius: '5px',
    fontSize: '14px',
    color: '#333',
  };

  const detailItemStyle = {
    marginBottom: '8px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>System Logs</h1>
      <div className="log-container">
        {error ? (
          <p style={{ color: 'red' }}>{error}</p> // Display error message if any
        ) : logs.length === 0 ? (
          <p>No logs available.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerStyle}>Timestamp</th>
                <th style={headerStyle}>Action</th>
                <th style={headerStyle}>Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => {
                let action = "";
                let details = "";
                let userEmail = "Unknown Email"; // Default to Unknown Email

                if (log.includes("logged in")) {
                  action = "Login";
                  userEmail = log.split("email: ")[1] || "Unknown Email";
                } else if (log.includes("logged out")) {
                  action = "Logout";
                  userEmail = log.split("email: ")[1] || "Unknown Email";
                } else if (log.includes("Item Added")) {
                  action = "Add";
                  const productDetails = log.split("Product Title: ")[1];
                  if (productDetails) {
                    const title = productDetails.split(",")[0]; // Extract only the title
                    details = title;
                    userEmail = log.split("User: ")[1] || "Unknown Email"; // Extract email for Add
                  }
                } else if (log.includes("Item Edited")) {
                  action = "Edit";
                  const productDetails = log.split("Changes Made: ")[1];
                  if (productDetails) {
                    details = (
                      <div style={detailsContainerStyle}>
                        <strong>Edited Details:</strong>
                        <div style={detailItemStyle}>{productDetails}</div>
                      </div>
                    );
                    userEmail = log.split("User: ")[1] || "Unknown Email"; // Extract email for Edit
                  }
                } else if (log.includes("Item Deleted")) {
                  action = "Delete";
                  const productDetails = log.split("Product Title: ")[1];
                  details = productDetails ? productDetails.split(",")[0] : "No details available";
                  userEmail = log.split("User: ")[1] || "Unknown Email"; // Extract email for Delete
                }

                return (
                  <tr key={index} style={index % 2 === 0 ? {} : rowHoverStyle}>
                    <td style={timestampColumnStyle}>
                      {new Date(log.split(" ")[0]).toLocaleString()}
                    </td>
                    <td style={actionColumnStyle}>{action}</td>
                    <td style={detailsColumnStyle}>
                      {details}
                      {action !== "Edit" && <div><strong>User:</strong> {userEmail}</div>} {/* Only display user for Add, Delete */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default SystemLogPage;
