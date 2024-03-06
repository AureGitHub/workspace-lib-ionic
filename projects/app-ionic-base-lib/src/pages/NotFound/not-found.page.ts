
import { Router } from '@angular/router';

import { Component,  OnInit } from '@angular/core';
import { FormControl, FormGroup,  Validators } from '@angular/forms';
import { SeguridadService } from '../../services/seguridad.service';
import { MyHttpService, classHttp } from '../../services/my-http.service';
import { LocalStoragedService } from '../../services/localStorage.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit {

  constructor(

    ) { }

  ngOnInit() {
  }

}
