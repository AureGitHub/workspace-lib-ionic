import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuButtonsComponent } from './menu-buttons.component';


@NgModule({
  declarations: [
    MenuButtonsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,    
    ReactiveFormsModule,
    RouterModule,
    FormsModule ,

  ],
  exports: [
    MenuButtonsComponent
  ],
  providers: [
  ],

})
export class MenuButtonsModule { }