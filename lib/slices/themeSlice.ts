import { createSlice } from "@reduxjs/toolkit";

type ThemeState = "light" | "dark";

const initialState: { value: ThemeState } = {
  value: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: { payload: ThemeState }) => {
      state.value = action.payload;
    },
    toggleTheme: (state) => {
      state.value = state.value === "light" ? "dark" : "light";
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
