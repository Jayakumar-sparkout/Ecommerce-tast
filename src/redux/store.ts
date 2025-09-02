import { configureStore } from "@reduxjs/toolkit";
import userNames from '../slice/loginslice'
import userEmails from '../slice/loginslice'
import  upLoad from '../slice/loginslice'
import Name from '../slice/loginslice'
import Rating from '../slice/loginslice'
import Offer from '../slice/loginslice'
import Price from '../slice/loginslice'
import CountItem from '../slice/loginslice'
import payment from '../slice/loginslice'
import { Upload } from "lucide-react";

export const makeStore = () => {
  return configureStore({
    reducer: {
      userDetail: userNames,
      userEmailDetails:userEmails,
      imageName: upLoad,
      imagePrice:Price,
      imageProName:Name,
      imageOffer:Offer,
      imageRating:Rating,
      imageCount:CountItem,
      finalPayment:payment
    },
  });
};


export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
