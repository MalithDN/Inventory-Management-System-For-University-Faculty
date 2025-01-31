import { useState, useEffect } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersForAdmin,
  getUserDetailsForAdmin,
  updateUserRole,
} from "@/store/admin/user-slice"; // Ensure this is correct
import { useToast } from "../ui/use-toast";

const initialFormData = {
  role: "", // Initialize role as empty
};

function AdminUserDetailsView({ userDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    if (userDetails) {
      setFormData({ role: userDetails.role }); // Set the role from userDetails
    }
  }, [userDetails]);

  function handleUpdateRole(event) {
    event.preventDefault();
    const { role } = formData;

    if (!role) {
      toast({
        title: "Please select a role",
        description: "You must select a role for the user.",
        variant: "destructive",
      });
      return;
    }

    dispatch(updateUserRole({ id: userDetails._id, role })).then((data) => {
      if (data?.payload?.success) {
        setOpenDetailsDialog(false); // Close dialog after role update
        dispatch(getUserDetailsForAdmin(userDetails._id)); // Re-fetch updated user details
        dispatch(getAllUsersForAdmin()); // Re-fetch all users
        setFormData(initialFormData); // Reset form data
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">User ID</p>
            <Label>{userDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Username</p>
            <Label>{userDetails?.userName}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">E-mail</p>
            <Label>{userDetails?.email}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Role</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  userDetails?.role === "admin"
                    ? "bg-green-500"
                    : userDetails?.role === "user"
                    ? "bg-blue-500"
                    : "bg-gray-500"
                }`}
              >
                {userDetails?.role}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div>
          <CommonForm
            formControls={[
              {
                label: "User Role",
                name: "role",
                componentType: "select",
                options: [
                  { id: "admin", label: "Admin" },
                  { id: "user", label: "User" },
                  { id: "moderator", label: "Moderator" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update User Role"}
            onSubmit={handleUpdateRole}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminUserDetailsView;
