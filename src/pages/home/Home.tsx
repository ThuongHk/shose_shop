import Reac, { useEffect} from 'react'
import ProductCard from '../../components/product/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/store'
import { ProductModel, callApiProduct } from '../../redux/productSlice'

type Props = {}

function Home({}: Props) {
  const dispatch: DispatchType = useDispatch()
  const { arrProduct } = useSelector((state: RootState)=> state.productSlice)
  console.log(arrProduct)

  useEffect(()=>{
   const actionThunk = callApiProduct()
   dispatch(actionThunk)
  },[])
  return (
    <div className="container"> 
      <h1 className="text-center h2 mt-4 mb-5">_Shose shop_</h1>
      <div className='row'>
        {arrProduct.map((prod: ProductModel,index: number)=>{
          return <div key={index} className='col-3 mb-4'>
          <ProductCard prod={prod}/>
        </div>
        })}
        
      
      </div>
    </div>
  )
}

export default Home