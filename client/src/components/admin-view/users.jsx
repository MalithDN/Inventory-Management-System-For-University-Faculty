import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminUserDetailsView from "./user-details"; // Updated to user-details
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersForAdmin,
  getUserDetailsForAdmin,
  resetUserDetails,
  deleteUserForAdmin,
} from "@/store/admin/user-slice"; // Updated to user-slice actions
import { Badge } from "../ui/badge";

function AdminUsersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { userList, userDetails } = useSelector((state) => state.adminUser); // Updated to userList and userDetails
  console.log("Redux State - userList:", userList);
  const dispatch = useDispatch();

  function handleFetchUserDetails(getId) {
    dispatch(getUserDetailsForAdmin(getId)); // Fetch user details when clicked
  }

  function handleDeleteUser(userId) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserForAdmin(userId));
    }
  }
  

  useEffect(() => {
    dispatch(getAllUsersForAdmin()); // Fetch all users when the component mounts
  }, [dispatch]);

  console.log(userDetails, "userList");

  useEffect(() => {
    if (userDetails !== null) setOpenDetailsDialog(true); // Open the dialog when userDetails are available
  }, [userDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userList && userList.length > 0
              ? userList.map((userItem) => (
                  <TableRow key={userItem?._id}>
                    <TableCell>{userItem?.userName}</TableCell>
                    <TableCell>{userItem?.email}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          userItem?.role === "admin"
                            ? "bg-green-500"
                            : userItem?.role === "moderator"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                        }`}
                      >
                        {userItem?.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetUserDetails()); // Reset user details on closing
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleFetchUserDetails(userItem?._id)
                          }
                        >
                          Edit Details
                        </Button>

                        <Button onClick={() => 
                          handleDeleteUser(userItem._id)} 
                          style={{ marginLeft: "10px" }}>Delete
                          </Button>
                        <AdminUserDetailsView userDetails={userDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminUsersView;
