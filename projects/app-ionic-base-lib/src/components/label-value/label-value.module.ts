import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LabelValueComponent } from './label-value.component';

@NgModule({
  declarations: [LabelValueComponent],  
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [LabelValueComponent],  

})
export class LabelValueComponentModule { }