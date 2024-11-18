import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { IconUserComponent } from './icon-user/icon-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { MyTableComponent } from './my-table/my-table.component';
import { AppInitBaseComponent } from './app-init/app-init.component';
import { EditorEntityComponent } from './editor-entity/editor-entity.component';
import { CargandoComponent } from './cargando/cargando.component';
import { ButtonGuardarComponent } from './buttons/guardar/button.guardar.component';
import { ButtonCancelarComponent } from './buttons/cancelar/button.cancelar.component';
import { ButtonBorrarComponent } from './buttons/borrar/button.borrar.component';
import { FilterColumsPipe } from './my-table/pipes/filter-colums.pipe';
import { MyFileComponent } from './my-file/my-file.component';
import { MyImgComponent } from './my-img/my-img.component';
import { MyCameraComponent } from './my-camera/my-camera.component';
import { WebcamModule } from 'ngx-webcam';
import { FileManagementComponent } from './file-management/file-management.component';
import { Tc_tipoComponent } from './tc_tipo/tc_tipo.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    IconUserComponent, 
    HeaderComponent,
    MyTableComponent,
    AppInitBaseComponent,
    EditorEntityComponent,
    CargandoComponent,
    ButtonGuardarComponent,
    ButtonCancelarComponent,
    ButtonBorrarComponent,
    MyFileComponent,
    MyImgComponent,
    MyCameraComponent,
    FileManagementComponent,
    Tc_tipoComponent,
    FilterColumsPipe,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,    
    ReactiveFormsModule,
    RouterModule,
    FormsModule ,
    WebcamModule

  ],
  exports: [
    IconUserComponent, 
    HeaderComponent,
    MyTableComponent,
    AppInitBaseComponent,
    EditorEntityComponent,
    CargandoComponent,
    ButtonGuardarComponent,
    ButtonCancelarComponent,
    ButtonBorrarComponent,
    MyFileComponent,
    MyCameraComponent,
    FileManagementComponent,
    Tc_tipoComponent,
    MyImgComponent
  ],
  providers: [
  ],

})
export class SharedComponentsModule { }