import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { http } from '../util/settings/config';


export interface ProfileModel {
    ordersHistory: OrdersHistory[];
    email: string;
    name: string;
    password: null;
    gender: boolean;
    phone: string;
    facebookId: string;
    deleted: boolean;
    avatar: string;
}

export interface OrdersHistory {
    orderDetail: OrderDetail[];
    id: number;
    date: Date;
    status: null;
    email: string;
    alias: string;
}

export interface OrderDetail {
    name: string;
    alias: string;
    shortDescription: string;
    quantity: number;
    price: number;
    image: string;
    description: string;
}

export type StateProfile = {
    profile: ProfileModel | null
}

const initialState: StateProfile = {
    profile: null
}

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(callApiProfile.fulfilled, (state: StateProfile, action: PayloadAction<ProfileModel>) => {
                state.profile = action.payload
            })
    }
});

export const { } = profileSlice.actions

export default profileSlice.reducer

export const callApiProfile = createAsyncThunk('profileSlice/callApiProfile', async () => {
    const result = await http.post(`/api/Users/getProfile`)
    console.log(result)
    return result.data.content
})