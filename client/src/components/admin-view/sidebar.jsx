import {
  ChartNoAxesCombined,
  LayoutDashboard,
  Bell ,  
  Warehouse ,
  Users,

} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Inventory",
    path: "/admin/products",
    icon: <Warehouse />,
  },
  {
    id: "orders",
    label: "Notification",
    path: "/admin/orders",
    icon: <Bell />,  
  },
  {
    id: "users",
    label: "Users",
    path: "/admin/users",
    icon: <Users />,  
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col gap-2 mt-8">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex items-center gap-2 px-3 py-2 text-xl text-purple-700 transition-all duration-700 bg-purple-100 rounded-md cursor-pointer text-muted-foreground hover:text-white hover:bg-purple-700 hover:scale-105"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} className="text-purple-700"/>
                <h1 className="text-2xl font-extrabold text-purple-700">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="flex-col hidden w-64 p-6 border-r bg-background lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined size={30} className="text-purple-700"/>
          <h1 className="text-2xl font-extrabold text-purple-700">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
