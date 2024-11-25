import { Component, Input, OnInit } from '@angular/core';
import { Role } from '../../services/enum.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-menu-buttons',
  templateUrl: './menu-buttons.component.html',
  styleUrls: ['./menu-buttons.component.scss'],
})
export class MenuButtonsComponent  implements OnInit {
establecerTitle(item: any) {
  this.title.setTitle( `${item.key}` );
}
  
  @Input() menuItems = [];
  
  constructor(
    private title: Title,
   
  ) {
 
   }

  ngOnInit() {}

}
