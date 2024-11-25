import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'icon-remixicon',
  templateUrl: './icon-remixicon.component.html',
  styleUrls: ['./icon-remixicon.component.scss'],
})
export class IconremixiconComponent  implements OnInit {


  @Input()  class='';
  @Input()  style='font-size: 20px;';

  
  public ngOnInit(): void {

  }

}


