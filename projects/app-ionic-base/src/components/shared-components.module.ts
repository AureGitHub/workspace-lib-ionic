import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { IconUserComponent } from './icon-user/icon-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LstTableComponent } from './lst-table/lst-table.component';
import { HeaderComponent } from './header/header.component';
import { MyTableComponent } from './my-table/my-table.component';
import { AppInitBaseComponent } from './app-init/app-init.component';
import { EditorEntityComponent } from './editor-entity/editor-entity.component';
import { CargandoComponent } from './cargando/cargando.component';
import { ButtonGuardarComponent } from './buttons/guardar/button.guardar.component';
import { ButtonCancelarComponent } from './buttons/cancelar/button.cancelar.component';
import { ButtonBorrarComponent } from './buttons/borrar/button.borrar.component';
import { FilterColumsPipe } from './my-table/pipes/filter-colums.pipe';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    IconUserComponent, 
    LstTableComponent,
    HeaderComponent,
    MyTableComponent,
    AppInitBaseComponent,
    EditorEntityComponent,
    CargandoComponent,
    ButtonGuardarComponent,
    ButtonCancelarComponent,
    ButtonBorrarComponent,
    FilterColumsPipe
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
    IconUserComponent, 
    LstTableComponent,
    HeaderComponent,
    MyTableComponent,
    AppInitBaseComponent,
    EditorEntityComponent,
    CargandoComponent,
    ButtonGuardarComponent,
    ButtonCancelarComponent,
    ButtonBorrarComponent,
  ],
  providers: [
  ],

})
export class SharedComponentsModule { }