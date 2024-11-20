import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  console.log(uploadedImageUrl, "uploadedImageUrl");

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  async function handleRemoveImage(imageId) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admin/products/remove-image/${imageId}`
      );
      console.log(response.data, "Response after deletion");
      if (response.data.success) {
        dispatch(getFeatureImages()); // Refresh the list after deletion
      } else {
        console.error("Failed to remove image:", response.data.message);
      }
    } catch (error) {
      console.error("Error removing image:", error);
    }
  }
  
  

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "featureImageList");

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <Button onClick={handleUploadFeatureImage} className="w-full mt-5">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div key={featureImgItem.id} className="relative">
                <img
                  src={featureImgItem.image}
                  alt="Uploaded feature"
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
                <div className="absolute flex items-center gap-2 top-2 right-2">
                <Button
  variant="destructive"
  size="sm"
  onClick={() => {
    console.log("Removing image with id", featureImgItem.id);
    handleRemoveImage(featureImgItem.id);
  }}
>
  Remove Image
</Button>

                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
