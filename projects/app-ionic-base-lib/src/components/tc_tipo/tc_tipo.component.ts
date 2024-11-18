import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'tc-tipos',
  templateUrl: './tc_tipo.component.html',
  styleUrls: ['./tc_tipo.component.scss'],
})
export class Tc_tipoComponent implements OnInit {

  @Input() entityName = '';
  @Input() columns = [ { name: 'Descripción', prop: 'descripcion', type: 'text', OrderInit: 'ASC'},];
  @Input() user: any;
  @Input() tableRefresh: any;


  @Output() saveEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();


  constructor(
  ) {
    
  }
  async ngOnInit() {
  }
  
}


