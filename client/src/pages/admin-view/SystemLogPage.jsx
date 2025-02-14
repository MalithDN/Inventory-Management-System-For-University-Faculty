import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Badge } from "../../components/ui/badge"; // Assuming Badge component is available
import { useToast } from "../../components/ui/use-toast"; // Assuming Toast component is available

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Logs</CardTitle>
      </CardHeader>
      <CardContent style={{overflowY: "auto"}}>
      <div style={{ maxHeight: "calc(100vh - 215px)"}}>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p> // Display error message if any
        ) : logs.length === 0 ? (
          <p>No logs available.</p>
        ) : (
          <Table>
            <TableHeader style={{fontSize: "1rem"}}>
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
                      <div style={{ padding: '10px', backgroundColor: '#f2f2f2', margin: '5px 0', borderRadius: '5px', fontSize: '14px', color: '#333' }}>
                        <strong>Edited Details:</strong>
                        <div style={{ marginBottom: '8px' }}>{productDetails}</div>
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
                  <TableRow key={index} style={index % 2 === 0 ? {} : { backgroundColor: '#fafafa' }}>
                    <TableCell>
                      {new Date(log.split(" ")[0]).toLocaleString()}
                    </TableCell>
                    <TableCell>{action}</TableCell>
                    <TableCell>
                      {details}
                      {action !== "Edit" && <div><strong>User:</strong> {userEmail}</div>} {/* Only display user for Add, Delete */}
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
