import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userList: [],
  userDetails: null,
  isLoading: false, // Add isLoading to the initial state
};

export const getAllUsersForAdmin = createAsyncThunk(
  "/user/getAllUsersForAdmin",
  async () => {
    const response = await axios.get(`http://localhost:5000/api/admin/users/get`);
    console.log("API Response:", response.data);
    return response.data; // Adjust based on backend response structure
  }
);

export const getUserDetailsForAdmin = createAsyncThunk(
  "/user/getUserDetailsForAdmin",
  async (id) => {
    const response = await axios.get(`http://localhost:5000/api/admin/users/details/${id}`);
    return response.data; // Adjust based on backend response structure
  }
);

export const updateUserRole = createAsyncThunk(
  "/user/updateUserRole",
  async ({ id, role }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/users/updateRole/${id}`, { role });
      if (response.status === 200) {
        dispatch(getAllUsersForAdmin()); // Optionally refresh the whole list
        return response.data;
      } else {
        throw new Error('Failed to update role');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const deleteUserForAdmin = createAsyncThunk(
  "user/deleteUserForAdmin",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/users/delete/${userId}`);
      if (response.status === 200) {
        dispatch(getAllUsersForAdmin()); // Refresh the user list after deletion
        return response.data;
      } else {
        throw new Error('Deletion failed');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const adminUserSlice = createSlice({
  name: "adminUserSlice",
  initialState,
  reducers: {
    resetUserDetails: (state) => {
      console.log("resetUserDetails");
      state.userDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userList = action.payload.data; // Use action.payload if the data is directly returned
      })
      .addCase(getAllUsersForAdmin.rejected, (state, action) => {
        console.error("Error fetching users:", action.error.message || action.payload);
        state.isLoading = false;
        state.userList = [];
      })
      .addCase(getUserDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = action.payload.data; // Use action.payload if the data is directly returned
      })
      .addCase(getUserDetailsForAdmin.rejected, (state, action) => {
        console.error("Error fetching user details:", action.error.message || action.payload);
        state.isLoading = false;
        state.userDetails = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.userList = state.userList.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
      })
      .addCase(deleteUserForAdmin.fulfilled, (state, action) => {
        state.userList = state.userList.filter(user => user._id !== action.payload._id);
      })
      .addCase(deleteUserForAdmin.rejected, (state, action) => {
        console.error('Failed to delete user:', action.payload.message || 'Server error');
      });
  },
});

export const { resetUserDetails } = adminUserSlice.actions;

export default adminUserSlice.reducer;
