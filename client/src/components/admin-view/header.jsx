import { AlignJustify, LogOut ,House} from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Ensure navigate is correctly defined here
  
  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end gap-4">
      <Button
          onClick={() => navigate("/shop/home")} // Ensure navigate is used inside an arrow function
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow bg-purple-700 hover:bg-purple-900 transition-all duration-700 hover:scale-105"
        >
          <House />
          Home
        </Button>
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow bg-purple-700 hover:bg-purple-900 transition-all duration-700 hover:scale-105"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
