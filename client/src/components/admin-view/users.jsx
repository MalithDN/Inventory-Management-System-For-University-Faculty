import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { DialogContent } from "../ui/dialog"; // Assuming this import is correct
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminUserDetailsView from "./user-details"; // Ensure proper import path
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersForAdmin,
  getUserDetailsForAdmin,
  resetUserDetails,
  deleteUserForAdmin,
} from "@/store/admin/user-slice";
import { Badge } from "../ui/badge";
import { useToast } from "../ui/use-toast";

function AdminUsersView() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [dialogType, setDialogType] = useState(""); // State to track dialog type
  const { userList, userDetails } = useSelector((state) => state.adminUser);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    dispatch(getAllUsersForAdmin());
  }, [dispatch]);

  function handleFetchUserDetails(userId) {
    setSelectedUserId(userId);
    setDialogType("edit");
    dispatch(getUserDetailsForAdmin(userId));
  }

  function handleCloseDialog() {
    setSelectedUserId(null);
    setDialogType("");
    dispatch(resetUserDetails());
  }

  function handleDeleteConfirmation(userId) {
    setSelectedUserId(userId);
    setDialogType("delete");
  }

  function handleDeleteUser() {
    dispatch(deleteUserForAdmin(selectedUserId))
      .then((data) => {
        console.log("User deleted successfully");
        toast({
          title: data?.payload?.message,
        });
      })
      .catch(error => {
        toast({
          title: data?.payload?.message,
        });
        console.error("Failed to delete user:", error);
      });
    handleCloseDialog();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Users</CardTitle>
      </CardHeader>
      <CardContent style={{overflowY: "auto"}}>
      <div style={{ maxHeight: "calc(100vh - 215px)"}}>
        <Table>
        <TableHeader style={{fontSize: "1rem"}}>
          <TableRow>
            <TableHead style={{fontWeight: "bold" }}>Username</TableHead>
            <TableHead style={{fontWeight: "bold" }}>E-mail</TableHead>
            <TableHead style={{fontWeight: "bold" }}>Role</TableHead>
            <TableHead style={{fontWeight: "bold" }}>Department</TableHead>
            <TableHead style={{ textAlign: "center", fontWeight: "bold" }}>Action</TableHead>
          </TableRow>
        </TableHeader>
          <TableBody>
            {userList.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge className={`py-1 px-3 ${user.role === "admin" ? "bg-green-500" : "bg-gray-500"}`}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell style={{ textAlign: "center"}}>{user.department}</TableCell>
                <TableCell style={{ textAlign: "center"}}>
                  <Button onClick={() => handleFetchUserDetails(user._id)}>
                    Edit Role
                  </Button>
                  <Button onClick={() => handleDeleteConfirmation(user._id)} style={{ marginLeft: "10px" }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </CardContent>
      {dialogType === "edit" && (
        <Dialog
          open={selectedUserId !== null}
          onOpenChange={open => !open && handleCloseDialog()}
        >
          <AdminUserDetailsView userDetails={userDetails} onClose={handleCloseDialog} />
        </Dialog>
      )}
      {dialogType === "delete" && (
        <Dialog
          open={selectedUserId !== null}
          onOpenChange={open => !open && handleCloseDialog()}
        >
          <DialogContent>
            <p style={{ fontWeight: 'bold', textAlign: 'center' }}>Are you sure you want to delete this user?</p>
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
              <Button onClick={handleDeleteUser}>Yes</Button>
              <Button onClick={handleCloseDialog}>No</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}

export default AdminUsersView;
