import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieSlice";
import personReducer from "./reducers/personSlice";
import tvReducer from "./reducers/tvslice";


export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    person: personReducer
  }
})