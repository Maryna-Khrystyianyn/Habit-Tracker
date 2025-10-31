
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number | null;
  name: string;
}

const initialState: UserState = { id: null, name: "" };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: number; name: string }>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    clearUser: (state) => {
      state.id = null;
      state.name = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;