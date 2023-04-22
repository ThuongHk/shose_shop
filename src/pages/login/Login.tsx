import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { callApiLogin } from '../../redux/loginSlice'
import { useDispatch } from 'react-redux'
import { DispatchType } from '../../redux/store'

type Props = {}



export type LoginModel ={
  email: string,
  password: string
}

function Login({}: Props) {

 const dispatch: DispatchType = useDispatch()
  const formik = useFormik<LoginModel>({
  initialValues: {
    email: '',
    password: '',
  },
  onSubmit: (values: LoginModel) =>{
    const actionThunk = callApiLogin(values)
    dispatch(actionThunk)
  }
  })
  return (
    <form className='w-25 m-auto' onSubmit={formik.handleSubmit}>
      <h5 className="h3">Login</h5>
      <div className="form-group">
        <p>Email:</p>
        <input type="text" className="form-control" name='email' onChange={formik.handleChange}/>
      </div>
      <div className="form-group mt-2">
        <p>Password:</p>
        <input type="text" className="form-control" name='password' onChange={formik.handleChange}/>
      </div>
      <button type="submit" className="btn btn-success text-dark mt-2">Submit</button>
    </form>
  )
}

export default Login