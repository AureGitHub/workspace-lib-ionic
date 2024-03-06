import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from '../../services/seguridad.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-icon-user',
  templateUrl: './icon-user.component.html',
  styleUrls: ['./icon-user.component.scss'],
})
export class IconUserComponent  implements OnInit {

  isModalOpen = false;

  @Input() user: any;
  @Input()lastMin = false;

  constructor(
    private seguridadService: SeguridadService,
    private router: Router,
    private utilService: UtilService,

  ) { }

  ngOnInit() {}

  setOpen(isOpen: boolean) {
    if(this.user){
    this.isModalOpen = isOpen;
    }
    else{
      this.router.navigate([`/login`]);
    }
  }

  desconectar(){
    this.user = null;
    this.seguridadService.UserClear();    
    this.isModalOpen=false;
    this.utilService.subjectSetMenu.next([]);



    // this.router.navigate([`/#/${app}`]);

    this.router.navigate([`/`]);
  }

}
