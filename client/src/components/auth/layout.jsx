import accImg from "../../assets/login.png"; 
import { Outlet } from "react-router-dom"; 

function AuthLayout() {
  return (
    <div className="flex h-screen w-full">
      {/* Left Section with Background Image */}
      <div
        className="hidden lg:flex w-1/2 h-full items-center justify-center bg-cover bg-left"
        style={{
          backgroundImage: `url(${accImg})`,
        }}
      >
        {/* Logo Section */}
        <div className="absolute top-4 left-6">
          <img 
            src="https://tech.cmb.ac.lk/wp-content/uploads/2017/10/technology-logo.png" 
            alt="Logo" 
            className="w-1/2 h-auto transition-all duration-500 ease-in-out hover:scale-105"
          />
        </div>
      </div>

      {/* Right Section with Content */}
      <div className="flex flex-col items-center justify-start flex-1 h-full px-4 py-12 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <h1 className="select-none text-center text-4xl lg:text-5xl font-bold mb-8 text-purple-700 transition-all duration-500 hover:scale-105">
        <span className="block mb-4">Inventory Management</span> <span>System</span>
        </h1>
        {/* Login Form Section */}
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl mt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
