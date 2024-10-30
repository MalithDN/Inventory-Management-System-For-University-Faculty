import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        
        <CardContent>
          <h2 className="mt-2 mb-2 text-xl font-bold">Index: {product?.index}</h2>
          <h2 className="mt-2 mb-2 text-xl font-bold">Category: {product?.category}</h2>
          <h2 className="mt-2 mb-2 text-xl font-bold">Department: {product?.department}</h2>
          <div className="flex items-center justify-between mb-2">
            
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
