import { createSlice } from "@reduxjs/toolkit";

const farms = JSON.parse(localStorage.getItem("farms") || "[]");

const initialState = {
  farms: farms || [],
  selectedFarm: farms?.[0],
};

const farmSlice = createSlice({
  name: "farm",
  initialState,
  reducers: {
    setFarms: (state, action) => {
      state.farms = action.payload;
      localStorage.setItem("farms", JSON.stringify(action.payload));
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
