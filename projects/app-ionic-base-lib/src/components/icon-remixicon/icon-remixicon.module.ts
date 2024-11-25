import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IconremixiconComponent } from './icon-remixicon.component';

@NgModule({
  declarations: [IconremixiconComponent],  
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [IconremixiconComponent],  

})
export class IconremixiconComponentModule { }