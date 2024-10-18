
import { Router } from '@angular/router';

import { Component,  OnInit } from '@angular/core';
import { FormControl, FormGroup,  Validators } from '@angular/forms';
import { SeguridadService } from '../../services/seguridad.service';
import { MyHttpService, classHttp } from '../../services/my-http.service';
import { LocalStoragedService } from '../../services/localStorage.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'page-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;
  user : any = null;


  date: any;
  constructor(
    private seguridadService: SeguridadService,
    private myHttpService: MyHttpService,
    private localStoragedService: LocalStoragedService,
    private router: Router,
    private utilService : UtilService

    ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
      
    });

    let email = this.localStoragedService.GetWithSession('email')?.data;
    let password = this.localStoragedService.GetWithSession('password')?.data;;

    this.loginForm.controls['email'].setValue(email);
    this.loginForm.controls['password'].setValue(password);
  }

  async onSubmit() { 
    this.isSubmitted = true;

    const objHttp : classHttp = new classHttp(
      'post','security',null, 'login',this.loginForm.value

    );

    this.isSubmitted = true;
    const data = await this.myHttpService.ejecuteURL(objHttp);

    this.isSubmitted=false;

    if(data){      

      this.localStoragedService.Save('email',this.loginForm.controls['email'].value);
      this.localStoragedService.Save('password',this.loginForm.controls['password'].value);

      let {user, token} = data;
     
      user.token = token;
      this.seguridadService.UserGuardar(user);
      this.utilService.MenuRefresh();
      this.router.navigate([`/`]);
    }



}

get email() { return this.loginForm.get('email'); }

get password() { return this.loginForm.get('password'); }
  

}
