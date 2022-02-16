import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	favorites: null
};

const favoritesSlice = createSlice({
	name: "favorites",
	initialState,
	reducers: {
		setFavorites: (state, action) => {
			state.favorites = action.payload;
		}
    }
});

export const { setFavorites} = favoritesSlice.actions;

export default favoritesSlice.reducer;
