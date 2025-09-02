'use client'
import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import { act, useState } from 'react'
interface loginState{
 loginName:string,
 loginEmail:string,
 UpLoadImage:string,
 proName:string,
 proPrice:string,
 prorRating:string,
 proOffer:string,
proCountItem:string,
paymentAmount:string
}

const initialState:loginState ={
    loginName:'',
    loginEmail:'',
    UpLoadImage:'',
    proName:'',
    proOffer:'',
    prorRating:'',
    proPrice:'',
    proCountItem:'',
    paymentAmount:''
}

export const LoginData = createSlice({
    name:'loginName',
    initialState,
    reducers:{
     setUserLoginData : (state, action: PayloadAction<string>) => {
      state.loginName = action.payload;
     },
     setUserEmail:(state,action:PayloadAction<string>)=>{
        state.loginEmail = action.payload
     },
     setUploadName:(state,action:PayloadAction<string>)=>{
        state.UpLoadImage= action.payload
     },
     setProName:(state,action:PayloadAction<string>)=>{
        state.proName=action.payload
     },
     setProRating:(state,action:PayloadAction<string>)=>{
        state.prorRating = action.payload
     },
     setProOffer:(state,action:PayloadAction<string>)=>{
        state.proOffer = action.payload
     },
     setProPrice:(state,action:PayloadAction<string>)=>{
        state.proPrice = action.payload
     },
     setProItem:(state,action:PayloadAction<string>)=>{
      state.proCountItem = action.payload
     },
     setPayment:(state,action:PayloadAction<string>)=>{
      state.paymentAmount = action.payload
     }
    }
})



export const { setUserLoginData,setUserEmail,setUploadName,setProName,setProOffer,setProPrice,setProRating,setPayment,setProItem } = LoginData.actions;
export default LoginData.reducer;