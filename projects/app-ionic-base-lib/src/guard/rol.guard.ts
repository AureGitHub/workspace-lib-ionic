
import { Inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../services/seguridad.service';
import { Role } from '../services/enum.service';


@Injectable()
export class RolGuard implements CanActivate {
  constructor(
    private seguridadService: SeguridadService,
    private _router: Router,
    @Inject('settings') private settings,
    ) {
  }

  // Cualquir routing con este canActivate exige que hay usuario logado
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.seguridadService.UserGet();

    const menuItems = next.data['menuItems'];

    if(!menuItems){
      throw new Error(`
        Guard.. Menu no enviado  (${next.routeConfig.path})
        routes.forEach(route => {
          route.data = { menuItems } 
        })
        `)
    }

    const ItemActual =menuItems.find(a=> a.key == next.routeConfig.path); 

    if(!ItemActual.roles || ItemActual.roles.length == 0 ){
      return true;  // NO EXIGE ningun rol
    }
  
    //si pagina el login, no hacer nada

    if (!currentUser) {
      this._router.navigate(['/']);
      return false;
    }

    if(currentUser.roleid == Role.god)
    {
      return true; // es GOD!!!!
    }


   

  
    return ItemActual.roles.some(a=> a == currentUser.roleid);
  }

}
