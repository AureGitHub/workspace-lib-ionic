import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lst-table',
  templateUrl: './lst-table.component.html',
  styleUrls: ['./lst-table.component.scss'],
})
export class LstTableComponent  implements OnInit {
@Input() title: string;
@Input() subTitle: string;
@Input() isLoading: string;
@Input() lst: any[];
@Input() colum: string;


@Output() selectEvent = new EventEmitter<true>();

  constructor() { }

  ngOnInit() {}

  selectitem(item){
    this.selectEvent.emit(item);
  }

}
