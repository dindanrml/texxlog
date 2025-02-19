import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, collection, getDocs } from "../firebase";

export const fetchTextures = createAsyncThunk("texture/fetchTextures", async () => {
  const querySnapshot = await getDocs(collection(db, "textures"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

const textureSlice = createSlice({
  name: "texture",
  initialState: { textures: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTextures.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTextures.fulfilled, (state, action) => {
        state.textures = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchTextures.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default textureSlice.reducer;