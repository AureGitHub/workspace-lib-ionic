import { Inject, Injectable } from '@angular/core';
import { MyHttpService, MyHttpService_EXEC } from '../../services/my-http.service';
import { SeguridadService } from '../../services/seguridad.service';
import { UtilService } from '../../services/util.service';
import { AlertController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class BasePageService {
  constructor(
    public myHttpService: MyHttpService,
    public seguridadService: SeguridadService,
    public myHttpService_EXEC: MyHttpService_EXEC,     
    public utilService: UtilService,
    public alertController: AlertController,


  ) {
  }

}