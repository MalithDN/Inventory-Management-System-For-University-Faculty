import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  department: "ICT",       
  device: "Computer",     
  did: "",
  halltype: "Laboratory",
  hallid: "A 101",    
  condition: "Working/Functional",
  Repairdate: "",
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    const isDidUnique = productList.every(
      (product) => product.did !== formData.did || product._id === currentEditedId
    );

    if (!isDidUnique) {
      toast({
        title: "Error",
        description: "DID must be unique. Please enter a different value.",
        variant: "destructive",
      });
      return;
    }

    if (currentEditedId !== null) {
      dispatch(editProduct({ id: currentEditedId, formData })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setFormData(initialFormData);
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          toast({ title: "Inventory edit successfully" });
        }
      });
    } else {
      dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setOpenCreateProductsDialog(false);
          setImageFile(null);
          setFormData(initialFormData);
          toast({ title: "Inventory added successfully" });
        }
      });
    }
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast({ title: "Inventory delete successfully" });
      }
    });
  }

  useEffect(() => {
    if (currentEditedId !== null) {
      const currentProduct = productList.find(item => item._id === currentEditedId);
      if (currentProduct) {
        const formattedRepairDate = currentProduct.Repairdate
          ? new Date(currentProduct.Repairdate).toISOString().split('T')[0]
          : '';

        setFormData({
          ...currentProduct,
          Repairdate: formattedRepairDate,
        });
      }
    }
  }, [currentEditedId, productList]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="flex justify-end w-full mb-5">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Inventory
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 max-h-[500px] overflow-y-auto">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Inventory" : "Add New Inventory"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;