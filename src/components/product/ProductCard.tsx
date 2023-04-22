import React from 'react'
import { NavLink } from 'react-router-dom'
import { ProductModel } from '../../redux/productSlice'
import { RelatedProduct } from '../../redux/productDetailSlice'

type Props = {
  prod?: ProductModel | RelatedProduct
}

function ProductCard({prod}: Props) {
  return (
    <div className="card w-75">
        <div className="heade d-flex flex-column position-relative">
        <i className="fa fa-heartbeat position-absolute mx-2 end-0 mt-2 text-danger h4" />
        <img src={prod?.image ? prod?.image : 'https://picsum.photos/200/200'} alt={prod?.name} />
        </div>
        <div className="body pb-3">
            <h4 className="h4">{prod?.name}</h4>
            <p>{prod?.shortDescription}</p>
        </div>
        <div className="d-flex">
            <NavLink className='w-50 bg-success text-light text-decoration-none text-center line-highlight' to={`/detail/${prod?.id}`}>Buy now</NavLink>
            <b className='w-50 bg-warning text-black text-center'>{prod?.price}$</b>
        </div>
    </div>
  )
}

export default ProductCard