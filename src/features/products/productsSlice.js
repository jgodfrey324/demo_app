import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    byId: [],
    products: {},
    status: 'idle', // 'idle' | 'loading' | 'fulfilled' | 'failed'
    error: null
  };  

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  console.log('[Thunk] Fetching products...')
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return await res.json();
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {  // pending
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {    // fulfilled
        state.status = 'succeeded';
        state.byId = action.payload.map(product => product.id);
        state.products = action.payload.reduce((acc, product) => {
          acc[product.id] = product;
          return acc;
        }, {});
      })
      .addCase(fetchProducts.rejected, (state, action) => { // failed
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
})

export default productsSlice.reducer;
