import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'label-value',
  templateUrl: './label-value.component.html',
  styleUrls: ['./label-value.component.scss'],
})
export class LabelValueComponent  implements OnInit {


  @Input()  label='';
  @Input()  value='';

  
  public ngOnInit(): void {

  }

}


