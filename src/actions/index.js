import CoinsReducer from "./coinsActions";
import FavoritesReducer from "./favoritesActions";
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({
	favorites: FavoritesReducer,
	coins: CoinsReducer
});
