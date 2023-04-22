import React, {useEffect} from 'react'
import ProductCard from '../product/ProductCard'
import { useParams } from 'react-router-dom'
import { RelatedProduct, callApiProductDetail } from '../../redux/productDetailSlice'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/store'
import { addCart } from '../../redux/cartSlice'

type Props = {}

function Detail({ }: Props) {
  const dispatch: DispatchType = useDispatch()
  const params = useParams()
 
  const id: string | undefined = params.id
  console.log(id)
  const {productDetail} = useSelector((state: RootState)=> state.productDetailSlice)
  console.log(productDetail)
 

  useEffect(()=>{
    const actionThunk = callApiProductDetail(id as string)
    dispatch(actionThunk)
  },[id])
  return (
    <div className='container'>
      <div className='row mt-3 d-flex'>
        <div className='col-4 ml-5'>
          <img src={productDetail?.image} alt={productDetail?.name} />
        </div>
        <div className='col-4 ml-5 mt-5 text-left'>
          <h4 className='h3'>{productDetail?.name}</h4>
          <p>{productDetail?.shortDescription}</p>
          <button className='btn btn-outline-danger mt-2' onClick={()=>{ let itemCart = {...productDetail, quantity: 1}
            dispatch(addCart(itemCart))}}
            >Thêm vào giỏ hàng</button>
        </div>
      </div>
      <div className='row'>
        {productDetail?.relatedProducts.map((prod: RelatedProduct, index: number)=>{
          return  <div key={index} className='col-4'>
          <ProductCard prod={prod} />
        </div>
        })}       
       
      </div>

    </div>
  )
}

export default Detail