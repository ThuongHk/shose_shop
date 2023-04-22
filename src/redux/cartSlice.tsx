import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ProductModel } from './productSlice';
import { ProductDetailModel } from './productDetailSlice';


export type StateCard = {
    listCart: ProductDetailModel[]
}

const initialState: StateCard = {
   listCart: []
   
}


const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addCart: (state, action) =>{
     let itemCart = state.listCart.find(item => item.id === action.payload.id)
     if(itemCart){
      itemCart.quantity += 1
     }else{
      state.listCart.push(action.payload)
     }
     
    },
    deleteCart: (state, action) =>{
       let id = action.payload
     let listCartDel =   state.listCart.filter(cart => cart.id != id)
     state.listCart = listCartDel
    },
    quantityCart: (state, action) =>{
      let {id, quantity} = action.payload
      const cartItem = state.listCart.find(item => item.id === id)
      if(cartItem){
        cartItem.quantity += quantity
         if(cartItem.quantity < 1){
          // alert('Số lượng nhỏ hơn 1')
          // cartItem.quantity -= quantity
          if(window.confirm('Do you want to Delete ?')){
            state.listCart = state.listCart.filter(item => item.id !== id)
          }else{
            cartItem.quantity -= quantity
          }
        }
      }
     
    }
  }
});

export const {addCart, deleteCart, quantityCart} = cartSlice.actions

export default cartSlice.reducer