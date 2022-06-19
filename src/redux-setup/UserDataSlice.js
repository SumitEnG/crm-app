import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editUserDetails, fetchUserDetails } from "../api/FetchUser";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

export const fetchUsersThunk = createAsyncThunk(
  "UserSlice/fetchUser",
  async () => {
    return await fetchUserDetails().then((res) => res.data);
  }
);

export const updateUsersThunk = createAsyncThunk(
  "UserSlice/updateUser",
  async (updateUserData) => {
    return await editUserDetails(updateUserData.userId, updateUserData).then(
      (res) => res.data
    );
  }
);

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsersThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUsersThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsersThunk.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.data = [];
    });
    builder.addCase(updateUsersThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUsersThunk.fulfilled, (state, action) => {
      const findIndex = state.data.findIndex((row) => {
        return row.userId == action.meta.arg.userId;
      });
      console.log(action.meta.arg);
      state.loading = false;
      state.data[findIndex] = {
        ...state.data[findIndex],
        name: action.meta.arg.updateUserData.userName,
        userTypes: action.meta.arg.updateUserData.userType,
        userStatus: action.meta.arg.updateUserData.userStatus,
      };
      state.error = "";
    });
    builder.addCase(updateUsersThunk.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.data = [];
    });
  },
});

export const UserSliceReducer = UserSlice.reducer;
