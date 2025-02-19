// Redux Store (src/store.js)
import { configureStore } from "@reduxjs/toolkit";
import textureReducer from "./features/textureSlice";

const store = configureStore({
  reducer: { texture: textureReducer },
});

export default store;