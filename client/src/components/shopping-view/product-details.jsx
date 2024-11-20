import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setReviewMsg("");
  }


  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 sm:p-8 lg:p-10 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative p-6 bg-black border border-gray-200 rounded-lg shadow-md">
          <h1 className="mb-2 text-xl font-semibold text-muted">ID: {productDetails?.did || "N/A"}</h1>
          <h2 className="mb-2 text-xl font-semibold text-muted">Device: {productDetails?.device || "Unspecified"}</h2> 
          <h2 className="mb-2 text-xl font-semibold text-muted">Hall Type: {productDetails?.halltype || "Unspecified"}</h2>  
          <h2 className="mb-2 text-xl font-semibold text-muted">Hall ID: {productDetails?.hallid || "Unknown"}</h2>    
          <h2 className="mb-2 text-xl font-semibold text-muted">Condition: {productDetails?.condition || "Not available"}</h2>   
          <h2 className="mb-2 text-xl font-semibold text-muted">Repair Date: {productDetails?.repairdate || "No date provided"}</h2>
        </div>

        <div className="relative p-6 bg-white border border-gray-200 rounded-lg shadow-md">
          <div className="mb-4">
            <h4 className="text-2xl font-bold text-gray-600">{productDetails?.title}</h4>
            <Separator className="my-4" />
            <p className="text-lg text-gray-600">Description:</p>
            <p className="mt-2 text-base text-gray-700">{productDetails?.description || "No description available."}</p>
          </div>
          

        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
