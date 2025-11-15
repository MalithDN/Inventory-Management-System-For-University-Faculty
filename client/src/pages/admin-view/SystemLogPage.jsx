import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { useToast } from "../../components/ui/use-toast";

function SystemLogPage() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const { toast } = useToast();

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
          // Sort the logs by timestamp in descending order
          const sortedLogs = data.logs.sort((a, b) => {
            const timestampA = new Date(a.split(" ")[0]);
            const timestampB = new Date(b.split(" ")[0]);
            return timestampB - timestampA; // Sort descending (newest first)
          });
          setLogs(sortedLogs);  // Update state with sorted logs
        } else {
          setError("Failed to fetch logs.");
        }
      } catch (error) {
        setError(error.message); // Set the error message for display
      }
    };

    fetchLogs();
  }, []); // Empty dependency array ensures this only runs once on component mount

  // Function to format the timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Logs</CardTitle>
      </CardHeader>
      <CardContent style={{ overflowY: "auto" }}>
        <div style={{ maxHeight: "calc(100vh - 215px)" }}>
          {error ? (
            <p style={{ color: 'red' }}>{error}</p> // Display error message if any
          ) : logs.length === 0 ? (
            <p>No logs available.</p>
          ) : (
            <Table>
              <TableHeader style={{ fontSize: "1rem" }}>
                <TableRow>
                  <TableHead style={{ fontWeight: "bold" }}>Timestamp</TableHead>
                  <TableHead style={{ fontWeight: "bold" }}>Action</TableHead>
                  <TableHead style={{ fontWeight: "bold" }}>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log, index) => {
                  let action = "";
                  let details = "";
                  let userEmail = "Unknown Email"; // Default to Unknown Email

                  // Check for Item Deleted (Product Deleted logs)
                  if (log.includes("Item Deleted")) {
                    action = "Item Deleted";
                    // Extract Product Title, Product ID, and User Email from the log
                    const productTitle = log.split("Product Title: ")[1].split(",")[0];
                    const productId = log.split("Product ID: ")[1].split(",")[0];
                    userEmail = log.split("User: ")[1] || "Unknown Email"; // Extract email for Delete
                    details = `Product Title: ${productTitle}, Product ID: ${productId}`; // Show Product Title and ID in details
                  } 
                  // Check for Item Added (Product Added logs)
                  else if (log.includes("Item Added")) {
                    action = "Item Added";
                    const productTitle = log.split("Product Title: ")[1].split(",")[0];
                    const productId = log.split("Product ID: ")[1].split(",")[0];
                    userEmail = log.split("User: ")[1] || "Unknown Email"; // Extract email for Add
                    details = `Product Title: ${productTitle}, Product ID: ${productId}`; // Show Product Title and ID in details
                  } 
                  // Check for other logs (Item Edited, User Role Update, User Deleted, Login, Logout)
                  else if (log.includes("Item Edited")) {
                    action = "Item Edited";
                    details = log.replace(/^\S+\s+\S+\s+\S+\s+/g, "").trim(); // Regex to remove timestamp
                    userEmail = log.split("User: ")[1] || "Unknown Email"; // Extract email for Edit
                  } 
                  else if (log.includes("Role Updated")) {
                    action = "User Role Update";
                    details = log.replace(/^\S+\s+\S+\s+\S+\s+/g, "").trim(); // Regex to remove timestamp
                    userEmail = log.split("User Email: ")[1] || "Unknown Email"; // Extract email for Role Update
                  } 
                  else if (log.includes("User Deleted")) {
                    action = "User Deleted";
                    details = log.replace(/^\S+\s+\S+\s+\S+\s+/g, "").trim(); // Regex to remove timestamp
                    userEmail = log.split("Action performed by: ")[1] || "Unknown Email"; // Extract action performed by email
                  } 
                  else if (log.includes("logged in")) {
                    action = "Login";
                    userEmail = log.split("email: ")[1] || "Unknown Email";
                  } else if (log.includes("logged out")) {
                    action = "Logout";
                    userEmail = log.split("email: ")[1] || "Unknown Email";
                  }

                  return (
                    <TableRow key={index} style={index % 2 === 0 ? {} : { backgroundColor: '#fafafa' }}>
                      <TableCell>
                        {/* Format the timestamp here */}
                        {formatTimestamp(log.split(" ")[0])}
                      </TableCell>
                      <TableCell>{action}</TableCell>
                      <TableCell>
                        {/* Display the raw log message */}
                        {details}
                        {/* Display User Email only when necessary */}
                        {action !== "Item Edited" && action !== "User Role Update" && action !== "User Deleted" && <div><strong>User:</strong> {userEmail}</div>} 
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default SystemLogPage;
