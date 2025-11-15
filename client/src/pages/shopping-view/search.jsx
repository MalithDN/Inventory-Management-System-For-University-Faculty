import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { fetchProductDetails } from "@/store/shop/products-slice";
import {
  getSearchResults,
  resetSearchResults,
  fetchAllProducts,
} from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if a search has been performed
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productList } = useSelector((state) => state.shopProducts); // Get all products
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  useSelector((state) => state.shopCart);
  const { toast } = useToast();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (keyword && keyword.trim() !== "") {
        setSearchPerformed(true); // Mark search as performed
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      } else {
        setSearchPerformed(false); // Reset when input is cleared
        setSearchParams(new URLSearchParams(`?keyword=`));
        dispatch(resetSearchResults());
        dispatch(fetchAllProducts()); // Dispatch action to fetch all products when search is empty
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [keyword, dispatch, setSearchParams]);

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  console.log(searchResults, "searchResults");

  // Choose to display search results if available, otherwise display all products
  const productsToDisplay =
    searchResults.length > 0 ? searchResults : searchPerformed ? [] : productList;

  return (
    <div className="container px-4 py-8 mx-auto md:px-6">
      <div className="flex justify-center mb-8">
        <div className="flex items-center w-full">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Search Inventory..."
          />
        </div>
      </div>

      {/* Show "No result found!" only if a search has been performed and returned no results */}
      {searchPerformed && searchResults.length === 0 && (
        <h1 className="text-5xl font-extrabold">No result found!</h1>
      )}

      {/* Only display products if there are valid search results or inventory */}
      {productsToDisplay.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productsToDisplay.map((item) => (
            <ShoppingProductTile
              key={item.id}
              product={item}
              handleGetProductDetails={handleGetProductDetails}
            />
          ))}
        </div>
      )}

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
