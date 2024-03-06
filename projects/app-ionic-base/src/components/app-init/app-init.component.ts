import { Component, Inject, OnInit } from '@angular/core';
import { SeguridadService } from '../../services/seguridad.service';
import { UtilService } from '../../services/util.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { MyHttpService } from '../../services/my-http.service';

@Component({
  selector: 'app-init-base',
  template: '',  
})
export class AppInitBaseComponent  implements OnInit {

  loading :HTMLIonLoadingElement;

  user : any;

  toast: any;

  constructor(
    public translate: TranslateService,
    private seguridadService: SeguridadService,
    private loadingCtrl: LoadingController,
    private utilService: UtilService,
    private toastController: ToastController,
    private myHttpService: MyHttpService,
    @Inject('settings') private settings,
    

  ) {

    

    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');

    this.translate.use('es');

    this.seguridadService.subjectUser.subscribe(user => {
      this.user = user;
    });


    this.utilService.subjectLoading.subscribe(async obj => {
      
      if(obj){
        // mostramos el loading

        this.loading = await this.loadingCtrl.create({
          message: obj['message'],
          // duration: 3000,
        });
    
        this.loading.present();

      }
      else{
        // matamos el loading
        this.loading.dismiss();
      }
    });

    this.utilService.subjectMessage.subscribe(async objMessage => {

      this.toast = await this.toastController.create({
        message: objMessage.message,
        position: this.settings.message[objMessage.type].position,
        icon: this.settings.message[objMessage.type].icon,
        color: this.settings.message[objMessage.type].color,
        duration:  this.settings.message[objMessage.type].time,
        buttons: [{
          text: 'Cerrar',
          role: 'cancel',
        }],
      });

      await this.toast.present();


    });


  }
  async ngOnInit(): Promise<void> {
    this.utilService.refreshContext();

    await this.myHttpService.getEntity();

    // get entity


  }

}
