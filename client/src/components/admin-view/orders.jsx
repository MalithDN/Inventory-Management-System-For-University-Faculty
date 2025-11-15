import { Button } from "../ui/button";
// import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { format } from "date-fns"; // Import date-fns to format today's date

// import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../ui/badge";
import { useToast } from "@/components/ui/use-toast";

import {
  addNewProduct,
  // deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditRepairDate } from "@/config";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  department: "",
  device: "",
  did: "",
  halltype: "",
  hallid: "",
  condition: "",
  Repairdate: "",
};

function AdminOrdersView({}) {
  const today = format(new Date(), "yyyy-MM-dd");
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  // const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  // const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Inventory add successfully",
            });
          }
        });
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Card>
      <div>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
        </CardHeader>
        <CardContent style={{ overflowY: "auto" }}>
          <div style={{ maxHeight: "calc(100vh - 215px)" }}>
            <Table>
              <TableHeader style={{ fontSize: "1rem" }}>
                <TableRow>
                  <TableHead style={{ fontWeight: "bold" }}>Product ID</TableHead>
                  <TableHead style={{ fontWeight: "bold" }}>Title</TableHead>
                  <TableHead style={{ fontWeight: "bold" }}>Device</TableHead>
                  <TableHead style={{ fontWeight: "bold" }}>Department</TableHead>
                  <TableHead style={{ fontWeight: "bold" }}>Hall ID</TableHead>
                  <TableHead style={{ fontWeight: "bold" }}>Repair Date</TableHead>
                  <TableHead style={{ fontWeight: "bold" }}>Condition</TableHead>
                  <TableHead style={{ fontWeight: "bold" }}>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productList && productList.length > 0
                  ? productList
                      .filter((productItem) => {
                        const productRepairDate = productItem.Repairdate.split("T")[0];
                        return productRepairDate <= today; // Only include products where the repair date is today or earlier
                      })
                      .map((productItem) => (
                        <TableRow key={productItem._id}>
                          <TableCell>{productItem.did}</TableCell>
                          <TableCell>{productItem.title}</TableCell>
                          <TableCell>{productItem.device}</TableCell>
                          <TableCell>{productItem.department}</TableCell>
                          <TableCell>{productItem.hallid}</TableCell>
                          <TableCell style={{ color: "red" }}>
                            <Badge className={`py-1 px-3 bg-red-500 `}>
                              {productItem.Repairdate.split("T")[0]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`py-1 px-3 ${productItem.condition === "Faulty" ? "bg-yellow-500" : 
                                                            productItem.condition === "Working/Functional" ? "bg-green-500" : 
                                                            productItem.condition === "Damaged" ? "bg-red-500" : 
                                                            productItem.condition === "Under Maintenance" ? "bg-blue-500" : "bg-gray-500"}`}>
                            {productItem.condition}
                            </Badge> 
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => {
                                setOpenCreateProductsDialog(true);
                                setCurrentEditedId(productItem?._id);
                                setFormData(productItem);
                              }}
                            >
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                  : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
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
                {currentEditedId !== null
                  ? "Edit Inventory"
                  : "Add New Inventory"}
              </SheetTitle>
            </SheetHeader>

            <div className="py-6">
              <CommonForm
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId !== null ? "Edit" : "Add"}
                formControls={EditRepairDate} //client/src/config/index.js
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Card>
  );
}

export default AdminOrdersView;
