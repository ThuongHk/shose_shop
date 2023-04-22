import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { http } from '../util/settings/config';

export type ProductModel = {
  id: number;
  name: string;
  alias: string;
  price: number;
  description: string;
  size: string;
  shortDescription: string;
  quantity: number;
  deleted: boolean;
  categories: string;
  relatedProducts: string;
  feature: boolean;
  image: string;
}


export interface StateProduct {
  arrProduct: ProductModel[]
}

const initialState: StateProduct = {
  arrProduct: [
    {
      "id": 1,
      "name": "Adidas Prophere",
      "alias": "adidas-prophere",
      "price": 350,
      "description": "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
      "size": "[36,37,38,39,40,41,42]",
      "shortDescription": "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
      "quantity": 995,
      "deleted": false,
      "categories": "[{\"id\":\"ADIDAS\",\"category\":\"ADIDAS\"},{\"id\":\"MEN\",\"category\":\"MEN\"},{\"id\":\"WOMEN\",\"category\":\"WOMEN\"}]",
      "relatedProducts": "[2,3,5]",
      "feature": true,
      "image": "https://shop.cyberlearn.vn/images/adidas-prophere.png"
    }
  ]
}

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {},
  extraReducers: builder =>{
    builder 
    .addCase(callApiProduct.fulfilled, (state: StateProduct, action: PayloadAction<ProductModel[]> )=>{
      state.arrProduct = action.payload
    })
  }
});

export const { } = productSlice.actions

export default productSlice.reducer


export const callApiProduct = createAsyncThunk('productSlice/callApiProduct', async (): Promise<ProductModel[]>=>{
  const result = await http.get('/api/Product')
  console.log(result)
  return result.data.content
})