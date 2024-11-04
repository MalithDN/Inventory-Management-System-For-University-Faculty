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
        <h2 className="mt-2 mb-2 text-xl font-bold">Title: {product?.title}</h2>
          <h2 className="mt-2 mb-2 text-xl font-bold">ID: {product?.did}</h2>
          <h2 className="mt-2 mb-2 text-xl font-bold">Device: {product?.device}</h2>
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
