import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'base-button-guardar',
  templateUrl: './button.guardar.component.html',
  styleUrls: ['./button.guardar.component.scss'],
})
export class ButtonGuardarComponent  implements OnInit {

  @Input() isSaving: boolean;
  @Input() valid: boolean;
  @Input() label='Guardar';  
  @Input() icon='save';  

  @Input() expand='expand';  
  

  constructor(
   
  ) { }

  ngOnInit() {}

}
