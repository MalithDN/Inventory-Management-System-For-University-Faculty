import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { departmentOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        
        <CardContent className="p-4">
          {/*
          <h2 className="mb-2 text-xl font-bold">{product?.title}</h2>
          */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] text-muted-foreground">
              Category: {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              Department: {departmentOptionsMap[product?.department]}
            </span>
          </div>
          <span className="text-[16px] text-muted-foreground">
              In {product?.location}.
          </span>
        </CardContent>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;
