import { NgModule } from '@angular/core';
import { LoginPage } from './login.page';
import { CommonPagesModule } from '../common.page.modules';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonPagesModule,
    RouterModule.forChild(routes)

  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
