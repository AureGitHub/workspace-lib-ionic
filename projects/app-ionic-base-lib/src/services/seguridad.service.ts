import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStoragedService } from './localStorage.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  url = `${this.environment.server}api/auth/`;

  fin_session_milisegundos: number;
  timerCountDownSession: any;


  subjectUser = new Subject<any>();
  subjecCountDownSessionLastMin = new Subject<boolean>();

  toast: any;
  constructor(
    private localStoragedService: LocalStoragedService,
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    @Inject('env') private environment,



  ) {
  }


  // time in minutes
  initCountDownSession(time_milisegundos: number = null) {

    const user = this.UserGet();
    if(user){
      this.CheckCountDownSession();
    }

  }



  async CheckCountDownSession() {
    const user = this.UserGet();
    if(!user){

      //cierro todo por si quedaba algo abierto...
      clearTimeout(this.timerCountDownSession);   
      this.UserClear();
      this.subjecCountDownSessionLastMin.next(false);
      if(this.toast){
        await this.toast.dismiss();
      }

      return;
    } 

    const milesegundos_hasta_fin_session = user.expires_in_milisegundos - new Date().getTime();
    const un_min_milisegundos = 60 * 1000;

    clearTimeout(this.timerCountDownSession);      


    if(milesegundos_hasta_fin_session <=0){
    
      console.log('entra a CheckCountDownSession con ' + milesegundos_hasta_fin_session);
      this.SessionKO();
      this.subjecCountDownSessionLastMin.next(false);
      if(this.toast){
        await this.toast.dismiss();
      }

      const alert = await this.alertController.create({
        header: `Antención!! su sesión ha finalizado. Debe iniciar sesión de nuevo`,
        buttons: [

          {
            text: 'OK',
            role: 'confirm',
            handler: () => {

            },
          },
        ],
      });

      await alert.present();

    }
    else  if (milesegundos_hasta_fin_session <=  un_min_milisegundos) {  //menor que 1 minuto
      // último minuto

      console.log('entra a CheckCountDownSession (menos de 1 min) con ' + milesegundos_hasta_fin_session);

      this.subjecCountDownSessionLastMin.next(true);

      this.toast = await this.toastController.create({
        message: 'Su sesión finaliza en menos de 1 minuto...',
        position: 'middle',
        icon: 'hourglass',
        cssClass: 'toast-class',
        buttons: [{
          text: 'Cerrar',
          role: 'cancel',
        }],
      });

      await this.toast.present();

      this.timerCountDownSession = setTimeout(() => { this.CheckCountDownSession() }, milesegundos_hasta_fin_session);

    }
    else {

      console.log('entra a CheckCountDownSession (mas de 1 min) con ' + milesegundos_hasta_fin_session);
      //queda más de 1 minuto...
      // lo meto en un setTimeout  fin_session_milisegundos - 60 * 1000

      if(this.toast){
        await this.toast.dismiss();
      }

      this.subjecCountDownSessionLastMin.next(false);

      
      this.timerCountDownSession = setTimeout(() => { this.CheckCountDownSession() }, milesegundos_hasta_fin_session - un_min_milisegundos);
      
    }

  }

  SessionKO() {
    clearTimeout(this.timerCountDownSession);      
    this.UserClear();
    this.router.navigate([`/`]);

  }



  UserGuardar(user: any) {

    this.localStoragedService.Save(this.environment.key_user, user);
    this.initCountDownSession();
    this.subjectUser.next(user);
  }

  UserGet(): any {
    let objUser = this.localStoragedService.GetWithSession(this.environment.key_user);

    if (!objUser) {
    // this.subjectUser.next(null);
      return null;
    }

    const actualTime = new Date().getTime();
    if (objUser.data.expires_in_milisegundos < actualTime) {
      this.UserClear();
      console.log('la información ha expirado');
      return null;
      //puedo redirigir al outer session caducada
    }

    //no ha caducado
    return objUser.data;
  }

  UserRefresh() {
    const user = this.UserGet();
    if (user) {
      this.UserGuardar(user);
    }
    else {

      this.router.navigate([`/`]);

    }

  }


  async UserClear() {
    this.localStoragedService.Clear(this.environment.key_user);
    this.subjectUser.next(null);
    if(this.toast){
      await this.toast.dismiss();
    }

    this.router.navigate([`/`]);
  }

  

}
