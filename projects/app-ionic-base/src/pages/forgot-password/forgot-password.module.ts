import { NgModule } from '@angular/core';
import { ForgotPasswordPage } from './forgot-password.page';
import { CommonPagesModule } from '../common.page.modules';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordPage
  }
];

@NgModule({
  imports: [
    CommonPagesModule,
    RouterModule.forChild(routes)

  ],
  declarations: [ForgotPasswordPage]
})
export class ForgotPasswordModule {}
