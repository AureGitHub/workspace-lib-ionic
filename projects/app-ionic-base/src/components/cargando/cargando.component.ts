import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from '../../services/seguridad.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-base-cargando',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.scss'],
})
export class CargandoComponent  implements OnInit {


  @Input() message: string;
  

  constructor(
   
  ) { }

  ngOnInit() {}

}
