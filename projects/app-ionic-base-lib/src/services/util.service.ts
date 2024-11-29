import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SeguridadService } from './seguridad.service';

import { AlertController } from '@ionic/angular';
import { Role } from './enum.service';


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  appTitle = this.settings.Title; 

  subjectSetMenu = new Subject<any>();
  subjectLoading = new Subject<any>();
  subjectMessage = new Subject<any>();

  constructor(
    private seguridadService: SeguridadService,
    private alertController: AlertController,
    @Inject('settings') private settings,
  ) {
  }


  

  message(type : string, message : string){
    //AppInitBaseComponent recibe
    this.subjectMessage.next({type,message});
  }


  filterMenuByUser(menu: any){
    const user = this.seguridadService.UserGet();

    const menuItems = menu.filter(a => 
      !a.roles ||
      ( user && (
      user.roleid == Role.god ||  
      a.roles.length == 0 || 
      a.roles.some(b => b == user.roleid))));

      return menuItems;

  }


  MenuRefresh() {          
    const menuItems = this.filterMenuByUser(this.settings.menuItems);
    const obj = {menuItems : menuItems}
    this.subjectSetMenu.next(obj);      
    return menuItems;
  }


  refreshContext(){
    this.seguridadService.UserRefresh();
    this.MenuRefresh();
  }




  pad(number: number) {
    var r = String(number);
    if (r.length === 1) {
      r = '0' + r;
    }
    return r;
  }

  toISOString(date) {
    return date.getFullYear() +
      '-' + this.pad(date.getMonth() + 1) +
      '-' + this.pad(date.getDate()) +
      'T' + this.pad(date.getHours()) +
      ':' + this.pad(date.getMinutes()) +
      ':' + this.pad(0) +
      '.' + String((0).toFixed(3)).slice(2, 5) +
      'Z';
  }

  getYearFromISO(dateInISO) {
    return dateInISO.split('T')[0];

  }

  async alert(cadena: string) {
    const alert = await this.alertController.create({
      header: cadena,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {
          },
        },
      ],
    });
    await alert.present();
  }


}