import { Component, Input, OnInit } from '@angular/core';
import { Role } from '../../services/enum.service';
import { Title } from '@angular/platform-browser';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-menu-buttons',
  templateUrl: './menu-buttons.component.html',
  styleUrls: ['./menu-buttons.component.scss'],
})
export class MenuButtonsComponent  implements OnInit {
establecerTitle(item: any) {
  this.title.setTitle( `${item.key}` );
}

menuItemsFilter = [];

  @Input() set menuItems(value){
    this.menuItemsFilter=this.utilService.filterMenuByUser(value);
  }
  
  constructor(
    private title: Title,
    private utilService: UtilService,

   
  ) {
 
   }

  ngOnInit() {}

}
