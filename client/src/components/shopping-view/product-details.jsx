import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { addReview } from "@/store/shop/review-slice";

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

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
      })
    ).then((data) => {
      if (data.payload.success) {
        setReviewMsg("");
        toast({
          title: "Problem reported successfully!",
        });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 sm:p-8 lg:p-10 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative p-6 bg-black border border-gray-200 rounded-lg shadow-md">
          <h1 className="mb-3 text-2xl font-bold">Index: {productDetails?.index || "N/A"}</h1>
          <h3 className="mb-2 text-xl font-semibold text-muted">Category: {productDetails?.category || "Unspecified"}</h3> 
          <h4 className="mb-2 text-xl font-semibold text-muted">Location: {productDetails?.location || "Unspecified"}</h4>  
          <h5 className="mb-2 text-xl font-semibold text-muted">In: {productDetails?.floor || "Unknown"} Floor</h5>    
          <h6 className="mb-2 text-xl font-semibold text-muted">Condition: {productDetails?.condition || "Not available"}</h6>   
          <h6 className="mb-2 text-xl font-semibold text-muted">Repair Date: {productDetails?.repairdate || "No date provided"}</h6>
        </div>

        <div className="relative p-6 bg-white border border-gray-200 rounded-lg shadow-md">
          <div className="mb-4">
            <p className="text-lg text-gray-600">Description:</p>
            <p className="mt-2 text-base text-gray-700">{productDetails?.description || "No description available."}</p>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col gap-4">
            <Label className="text-sm font-semibold text-gray-600">Report Problem Here</Label>
            <Input
              name="reviewMsg"
              value={reviewMsg}
              onChange={(event) => setReviewMsg(event.target.value)}
              placeholder="Describe the problem..."
              className="p-2 border-gray-300 rounded-md"
            />
            <Button
              onClick={handleAddReview}
              disabled={reviewMsg.trim() === ""}
              className="self-start mt-2"
            >
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
