import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

function UserCartWrapper({ setOpenCartSheet }) {
  const navigate = useNavigate();


  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Reports</SheetTitle>
      </SheetHeader>
      
      <Button
        onClick={() => {
          navigate("");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        Generate
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
