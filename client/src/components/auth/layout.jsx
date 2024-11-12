import accImg from "../../assets/login.png"; 
import { Outlet } from "react-router-dom"; 

function AuthLayout() {
  return (
    <div className="flex w-full min-h-screen">
      {/* Left Section with Background Image */}
      <div
        className="items-center justify-center hidden w-1/2 px-40 lg:flex"
        style={{
          backgroundImage: `url(${accImg})`, 
          backgroundSize: "cover",
          backgroundPosition: "end",
          height: "100vh",
        }}
      >
        {/* Logo Section */}
        <div className="absolute top-4 left-4"> {/* Adjust positioning with top and left as needed */}
          <img src="https://tech.cmb.ac.lk/wp-content/uploads/2017/10/technology-logo.png" alt="Logo" className="w-50 h-auto" style={{ maxWidth: "50%" }}/> {/* Adjust width as needed */}
        </div>
      </div>

      {/* Right Section with Content */}
      <div className="flex flex-col items-center justify-start flex-1 px-4 py-12 bg-background sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <h1 className="text-center text-6xl font-bold mb-8 text-foregroundv text-purple-700">
          Inventory Management<br/> System
        </h1>
        {/* Move the login form down with margin-top */}
        <div className="w-full max-w-xl mt-20"> {/* Changed max-w-md to max-w-xl */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
