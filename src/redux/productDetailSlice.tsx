import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { http } from '../util/settings/config';

export interface ProductDetailModel {
    id: number;
    name: string;
    alias: string;
    price: number;
    feature: boolean;
    description: string;
    size: string[];
    shortDescription: string;
    quantity: number;
    image: string;
    categories: Category[];
    relatedProducts: RelatedProduct[];
}

export interface Category {
    id: string;
    category: string;
}

export interface RelatedProduct {
    id: number;
    name: string;
    alias: string;
    feature: boolean;
    price: number;
    description: string;
    shortDescription: string;
    image: string;
}


export type StateDetail = {
    productDetail: ProductDetailModel | null
}


const initialState: StateDetail = {
    productDetail: null
}

const productDetailSlice = createSlice({
    name: 'productDetailSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>{
        builder
        .addCase(callApiProductDetail.fulfilled, (state: StateDetail,action: PayloadAction<ProductDetailModel>)=>{
            state.productDetail = action.payload
        })
    }
});

export const { } = productDetailSlice.actions

export default productDetailSlice.reducer

export const callApiProductDetail = createAsyncThunk('productDetailSlice/callApiProductDetail', async (id: string): Promise<ProductDetailModel>=>{
    const result = await http.get(`/api/Product/getbyid?id=${id}`)
    return result.data.content
})