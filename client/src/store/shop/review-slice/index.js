import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
  error: null,  // Add an error state
};

export const addReview = createAsyncThunk(
  "reviews/addReview",  // Use a unique action type
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/shop/review/add`,
        formData
      );
      return response.data;  // Ensure response is structured correctly
    } catch (error) {
      return rejectWithValue(error.response.data);  // Return error for handling
    }
  }
);

export const getReviews = createAsyncThunk(
  "reviews/getReviews",  // Use a unique action type
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/review/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);  // Return error for handling
    }
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;  // Reset error on new request
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optionally, add the new review to the reviews array
        state.reviews.push(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;  // Store the error
      })
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;  // Reset error on new request
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;  // Make sure this is the correct structure
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;  // Store the error
        state.reviews = [];  // Optionally clear reviews on error
      });
  },
});

export default reviewSlice.reducer;
