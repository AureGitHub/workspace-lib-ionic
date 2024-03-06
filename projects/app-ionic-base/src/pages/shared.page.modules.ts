import { NgModule } from '@angular/core';
import { LoginPageModule } from './login/login.module';


@NgModule({
  imports: [
    LoginPageModule
  ],
  exports: [
    LoginPageModule
  ],
 

})
export class  SharedPagesModule { }