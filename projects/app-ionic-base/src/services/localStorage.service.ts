import { Inject, Injectable, inject } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStoragedService {


  constructor(        
     @Inject('env') private environment,
  ) {
  }

  Save(key: string, obj: any) {

    var encryptInfo = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify({ data: obj }), this.environment.localStorageSave_secret).toString());    
    localStorage.setItem(key, encryptInfo);
  }


  GetWithSession(key: string) {
    var encryptInfo = localStorage.getItem(key);
    if (!encryptInfo) {
      return encryptInfo;
    }

    var deData = CryptoJS.AES.decrypt(decodeURIComponent(encryptInfo), this.environment.localStorageSave_secret);
    var dataObj = JSON.parse(deData.toString(CryptoJS.enc.Utf8));

    return dataObj;

    //if (!dataObj) return null;

    //const actualTime  = new Date().getTime();
    //if (dataObj.endSession < actualTime ) {
    //  this.UserClear();
    //  console.log('la información ha expirado');     
    //  return -1;
    //  //puedo redirigir al outer session caducada
    //} 

    ////no ha caducado
    //return dataObj.data;

  }

  Get(key: string) {
    let obj = this.GetWithSession(key);
    return obj?.data;
    
  }


  Clear(key: string) {
    localStorage.removeItem(key);
  }


  

   
}
