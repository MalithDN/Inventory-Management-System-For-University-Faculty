import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { departmentOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto transition-all duration-700 hover:scale-105 hover:shadow-lg">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        
        <CardContent className="p-4 ">
          {/*
          <h2 className="mb-2 text-xl font-bold">{product?.title}</h2>
          */}
          <div className="  mb-2 ">
            <span className="text-[16px] text-muted-foreground">
            <span className="font-semibold text-purple-700"> ID: </span>{product?.did}
            </span><br/><br/>
            <span className="text-[16px] text-muted-foreground">
              <span className="font-semibold text-purple-700">Title: </span>{product?.title}
            </span><br/><br/>
            <span className="text-[16px] text-muted-foreground">
            <span className="font-semibold text-purple-700">Hall ID: </span>{product?.hallid}
          </span>
          </div>
          
        </CardContent>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;
