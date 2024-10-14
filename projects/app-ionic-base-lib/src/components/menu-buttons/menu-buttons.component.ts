import { Component, Input, OnInit } from '@angular/core';
import { Role } from '../../services/enum.service';

@Component({
  selector: 'app-menu-buttons',
  templateUrl: './menu-buttons.component.html',
  styleUrls: ['./menu-buttons.component.scss'],
})
export class MenuButtonsComponent  implements OnInit {
  
  @Input() menuItems = [
    {
      title: 'Inmuebles',
      icon: 'business-outline',
      path: '/inmuebles/',
      key: 'inmuebles',  // para encontar la ruta en los guard
      roles: [Role.god, Role.admin]
    },
 
    {
     title: 'Agenda',
     icon: 'calendar-outline',
     path: '/agenda/',
     key: 'agenda',  // para encontar la ruta en los guard
     roles: [Role.god, Role.admin],
     // hide : true
   },
 
   {
     title: 'Servicios',
     icon: 'alarm-outline',
     path: '/servicios/',
     key: 'servicios',  // para encontar la ruta en los guard
     roles: [Role.god, Role.admin],
     // hide : true
   },
  ];
  
  constructor(
   
  ) { }

  ngOnInit() {}

}
