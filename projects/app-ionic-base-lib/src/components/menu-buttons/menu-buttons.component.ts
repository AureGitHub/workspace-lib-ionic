import { Component, Input, OnInit } from '@angular/core';
import { Role } from '../../services/enum.service';

@Component({
  selector: 'app-menu-buttons',
  templateUrl: './menu-buttons.component.html',
  styleUrls: ['./menu-buttons.component.scss'],
})
export class MenuButtonsComponent  implements OnInit {
  
  @Input() menuItems = [];
  
  constructor(
   
  ) { }

  ngOnInit() {}

}
