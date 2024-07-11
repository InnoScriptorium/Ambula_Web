// userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  mobileNumber: string;
  otp: string;
  profileDetails: {
    firstName: string;
    middleName: string;
    lastName: string;
    day: string;
    month: string;
    year: string;
    gender: string;
    mobileNumber: string;
    address: string;
    state: string;
    district: string;
    pincode: string;
    email: string;
    termsAccepted: boolean;
  };
  aadharNumber: string;
  abhaAddress: string; // New property for ABHA Address
}

const initialState: UserState = {
  mobileNumber: '',
  otp: '',
  profileDetails: {
    firstName: '',
    middleName: '',
    lastName: '',
    day: '',
    month: '',
    year: '',
    gender: '',
    mobileNumber: '',
    address: '',
    state: '',
    district: '',
    pincode: '',
    email: '',
    termsAccepted: false,
  },
  aadharNumber: '',
  abhaAddress: '', // Initial value for ABHA Address
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMobileNumber: (state, action: PayloadAction<string>) => {
      state.mobileNumber = action.payload;
    },
    setOtp: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },
    setProfileDetails: (state, action: PayloadAction<UserState['profileDetails']>) => {
      state.profileDetails = action.payload;
    },
    setAadharNumber: (state, action: PayloadAction<string>) => {
      state.aadharNumber = action.payload;
    },
    setAbhaAddress: (state, action: PayloadAction<string>) => {
      state.abhaAddress = action.payload;
    },
  },
});

export const { setMobileNumber, setOtp, setProfileDetails, setAadharNumber, setAbhaAddress } = userSlice.actions;

export default userSlice.reducer;
