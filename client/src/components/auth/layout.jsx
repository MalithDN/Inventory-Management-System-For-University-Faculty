import accImg from "../../assets/Home3.jpg"; 
import { Outlet } from "react-router-dom"; 

function AuthLayout() {
  return (
    <div className="flex w-full min-h-screen">
      <div
        className="items-center justify-center hidden w-1/2 px-12 lg:flex"
        style={{
          backgroundImage: `url(${accImg})`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <div className="max-w-md space-y-6 text-center text-white">
          <h1 className="font-bold leading-tight tracking-wide text-7xl drop-shadow-lg">
            Welcome to <br /> Inventory Management System
          </h1>
        </div>
      </div>

      {/* Other Content Section */}
      <div className="flex items-center justify-center flex-1 px-4 py-12 bg-background sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
