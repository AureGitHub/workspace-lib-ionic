import { NgModule } from '@angular/core';
import { CommonPagesModule } from '../common.page.modules';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPage } from './not-found.page';

const routes: Routes = [
  {
    path: '',
    component: NotFoundPage
  }
];

@NgModule({
  imports: [
    CommonPagesModule,
    RouterModule.forChild(routes)

  ],
  declarations: [NotFoundPage]
})
export class NotFoundPageModule {}
