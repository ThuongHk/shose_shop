import React, {useEffect} from 'react'
import { DispatchType, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { ProductModel } from '../../redux/productSlice'
import { deleteCart, quantityCart } from '../../redux/cartSlice'


type Props = {}

function Cart({}: Props) {
     const dispatch: DispatchType = useDispatch()
    const {listCart} = useSelector((state: RootState)=>state.cartSlice)
     console.log(listCart)
   
  return (
    <div className='container'>
      <h2 className='text-center h2 mb-5'>Giỏ hàng của bạn!</h2>
       <table className='table'>
      <thead>
      <tr>
        <th>TT</th>
        <th>Tên</th>
        <th>Hình ảnh</th>
        <th>Giá</th>
        <th>Số lượng</th>
        <th>Total</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
        {listCart.map((cart,index)=>{
          return (
            <tr key={index}>
            <td>{cart.id}</td>
             <td>{cart.name}</td>
             <td><img src={cart.image} style={{width: '60px', height: '60px'}} alt={cart.name}/></td>
             <td>{cart.price}</td>
             <td><button className='btn btn-outline-primary btn-sm' onClick={()=>{
              const actionItem = {id: cart.id, quantity: 1}
              dispatch(quantityCart(actionItem))
             }}>+</button> &nbsp;
              {cart.quantity} &nbsp;
              <button className='btn btn-outline-primary btn-sm' onClick={()=>{
              const actionItem = {id: cart.id, quantity: -1}
              dispatch(quantityCart(actionItem))
             }}>-</button>
              </td>
             <td>{(cart.price*cart.quantity)}$</td>
             <td><button className='btn btn-danger btn-sm' onClick={()=>{
              dispatch(deleteCart(cart.id))
             }}>Del</button></td>
            </tr>      
          )
        })}
         
      </tbody>      
    </table>

    </div>
     )
}


export default Cart