import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ACCESS_TOKEN, USER_LOGIN, history, http, settings } from '../util/settings/config';
import { LoginModel } from '../pages/login/Login';
import { RegisterModel } from '../pages/register/Register';




export type StateLoginModel = {
  email: string,
  accessToken: string
}

export type StateLogin = {
  userLogin: StateLoginModel | null
}

const initialState: StateLogin = {
    userLogin: settings.getStorageJson(USER_LOGIN) ? settings.getStorageJson(USER_LOGIN) : null
}

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder 
    .addCase(callApiLogin.fulfilled, (state: StateLogin, action: PayloadAction<StateLoginModel>) =>{
      state.userLogin = action.payload
      settings.setStorage(ACCESS_TOKEN, action.payload.accessToken)
      settings.setStorageJson(USER_LOGIN, action.payload)
      settings.setCookie(ACCESS_TOKEN, action.payload.accessToken,30)
      settings.setCookieJson(USER_LOGIN, action.payload,30)
      history.push('/profile')
    })
  }
});

export const {} = loginSlice.actions

export default loginSlice.reducer

export const callApiLogin = createAsyncThunk('loginSlice/callApiLogin',  async (userLogin: LoginModel) => {
  const result = await http.post('/api/Users/signin', userLogin)
  console.log(result)
  return result.data.content
 
})

export const callApiRegister = createAsyncThunk('loginSlice/callApiRegister', async (register: RegisterModel)=>{
  const result = await http.post(`/api/Users/signup`, register)
  console.log(result)
  return result.data.content
})