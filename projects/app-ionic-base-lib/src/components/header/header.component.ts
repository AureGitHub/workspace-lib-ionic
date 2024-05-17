import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SeguridadService } from '../../services/seguridad.service';
import { UtilService } from '../../services/util.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  menuItems = [];
  titleStr: string;
  user : any;
  appDescripcion='';
  currentmenuItem: any;
  lastMin = false;

  @Input() iconUserVisible = true;


  constructor(
    private seguridadService: SeguridadService,
    private utilService: UtilService,
    private router: Router,
    private title: Title,

  ) { 

    this.seguridadService.subjectUser.subscribe(user => {      
      this.user = user;
      if(!user){
        this.lastMin =false;
        this.menuItems = null;
        this.currentmenuItem =null;
        this.title.setTitle( `${this.appDescripcion} ` );
      }
      
    });


    this.seguridadService.subjecCountDownSessionLastMin.subscribe(estado => {
      this.lastMin = estado;
    });

    this.utilService.subjectSetMenu.subscribe(obj=>{
      this.menuItems = obj.menuItems.filter(a=> !a.hide);
      this.appDescripcion = this.utilService.appTitle;
      


    });


    this.router.events.subscribe(event => 
           {
            if(event instanceof NavigationEnd){
              if(this.menuItems){                
                this.currentmenuItem = this.menuItems.find(a=> a.path == event.url + '/');

                this.title.setTitle( `${this.appDescripcion} - ${this.currentmenuItem?.title ? this.currentmenuItem?.title : '' }` );

              }
              
            }
               
           })

  }

  ngOnInit() {}

}
