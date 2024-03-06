import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'base-button-borrar',
  templateUrl: './button.borrar.component.html',
  styleUrls: ['./button.borrar.component.scss'],
})
export class ButtonBorrarComponent  implements OnInit {

@Input() isDeleting: any;

  constructor(
   
  ) { }

  ngOnInit() {}

}
