import React, { useEffect } from 'react'
import { callApiProfile } from '../../redux/profileSlice'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/store'
import { useFormik } from 'formik'

type Props = {}


export type ProfileModel = {

}

function Profile({}: Props) {

const formik = useFormik<ProfileModel>({
  enableReinitialize: true,
  initialValues: {

  },
  onSubmit: (values:any) =>{

  }
})

const dispatch: DispatchType = useDispatch()
const {profile} = useSelector((state: RootState)=> state.profileSlice)
console.log(profile)
  useEffect(()=>{
         const actionThunk = callApiProfile()
         dispatch(actionThunk)
  },[])
  return (
    <div className='container'>
       <div className='row'>
        <h1>_Profile_</h1>
        <div className='col-4'>
          <img src={profile?.avatar} style={{width: '200px', height: '200px'}} alt='123' className='rounded-circle' />
        </div>
        <div className='col-8'>
          <form>
            <div className='row'>
              <div className='col-6'>
                <div className='form-group'>
                  <p>Họ tên: </p>
                  <input value={profile?.name} type='text' className='form-control'/>
                </div>
                <div className='form-group'>
                  <p>Số điện thoại: </p>
                  <input type='text' value={profile?.phone}  className='form-control'/>
                </div>
              </div>
              <div className='col-6'>
                <div className='form-group'>
                  <p>Email: </p>
                  <input type='text' value={profile?.email}  className='form-control' onChange={formik.handleChange}/>
                </div>
                <div className='form-group'>
                  <p>password: </p>
                  <input type='text' value={profile?.password ? profile?.password : '123'} className='form-control'/>
                </div>
                <div className='form-group d-flex'>
                  <div className='w-75'>
                    <p>Gender</p>
                    <input name="gender" type="radio" checked={profile?.gender} /> Male   &ensp;
                    <input name="gender" type="radio"  /> Female
                  </div>
                 <div className="mt-4">
                 <button className='btn btn-outline-primary mt-2'>Update</button>
                 </div>
                  </div>
               
              </div>
            </div>
          </form>
        </div>
       </div>
    </div>
  )
}

export default Profile


