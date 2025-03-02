import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  farms: [],
  selectedFarm: null,
};

const farmSlice = createSlice({
  name: "farm",
  initialState,
  reducers: {
    setFarms: (state, action) => {
      state.farms = action.payload;
    },

    setSelectedFarm: (state, action) => {
      state.selectedFarm = action.payload;
    },

    clearFarms: (state) => {
      state.farms = [];
      state.selectedFarm = null;
    },
  },
});

export const { setFarms, setSelectedFarm, clearFarms } = farmSlice.actions;

export default farmSlice.reducer;
