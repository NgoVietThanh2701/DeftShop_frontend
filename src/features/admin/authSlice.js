import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
   admin: null,
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: ""
}

export const loginAdmin = createAsyncThunk("admin/loginAdmin", async (admin, thunkAPI) => {
   try {
      const response = await axios.post('http://localhost:5000/admin/login', {
         email: admin.email,
         password: admin.password
      });
      return response.data;
   } catch (error) {
      if (error.response) {
         const message = error.response.data.msg;
         return thunkAPI.rejectWithValue(message);
      }
   }
})

export const getMeAdmin = createAsyncThunk("admin/getMeAdmin", async (_, thunkAPI) => {
   try {
      const response = await axios.get('http://localhost:5000/admin/me');
      return response.data;
   } catch (error) {
      if (error.response) {
         const message = error.response.data.msg;
         return thunkAPI.rejectWithValue(message);
      }
   }
})

export const logOutAdmin = createAsyncThunk("admin/logOut", async () => {
   await axios.delete('http://localhost:5000/admin/logout');
})

export const authSlide = createSlice({
   name: "auth",
   initialState,
   reducers: {
      reset: (state) => initialState
   },
   extraReducers: (builder) => {
      //auth user login
      builder.addCase(loginAdmin.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(loginAdmin.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isSuccess = true;
         state.admin = action.payload
      });
      builder.addCase(loginAdmin.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload;
      });
      //get admin login
      builder.addCase(getMeAdmin.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(getMeAdmin.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isSuccess = true;
         state.admin = action.payload;
      });
      builder.addCase(getMeAdmin.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload;
      });
   }
});
export const { reset } = authSlide.actions;
export default authSlide.reducer;
