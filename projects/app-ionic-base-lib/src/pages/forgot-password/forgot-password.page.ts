
import { Router } from '@angular/router';

import { Component,  OnInit } from '@angular/core';
import { FormControl, FormGroup,  Validators } from '@angular/forms';
import { SeguridadService } from '../../services/seguridad.service';
import { MyHttpService, classHttp } from '../../services/my-http.service';
import { LocalStoragedService } from '../../services/localStorage.service';
import { UtilService } from '../../services/util.service';
import { typeMessage } from '../../services/enum.service';

@Component({
  selector: 'forgot-password-login',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  sendEmailForm: FormGroup;
  sendresetPassword: FormGroup;

  isSubmittedsendEmail = false;
  isSubmittedResetPass = false;

  codeGenerated = false;

  
  constructor(
    private myHttpService: MyHttpService,
    private router: Router,
    private utilService : UtilService

    ) { }

  ngOnInit() {
    this.sendEmailForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email])
    });

   
    


    this.sendresetPassword = new FormGroup({
      'code': new FormControl('', [Validators.required]),
      'password': new FormControl('', Validators.required),
      'passwordRepeat': new FormControl('', Validators.required),
    });
  }

  async onSubmitsendEmail() { 
    this.isSubmittedsendEmail = true;
    this.codeGenerated = false;

    const objHttp : classHttp = new classHttp(
      'post','user', 'getCodeResetPass',this.sendEmailForm.value

    );

    this.isSubmittedsendEmail = true;
    const data = await this.myHttpService.ejecuteURL(objHttp);

    this.isSubmittedsendEmail=false;
    this.codeGenerated = data?.code;
      
    

}

async onSubmitsendNewPassword(){

  this.isSubmittedResetPass = true;

  try{

    const objHttp : classHttp = new classHttp(
      'post','user', 'reserPassByCode',this.sendresetPassword.value
    );

    const data = await this.myHttpService.ejecuteURL(objHttp);

     this.isSubmittedResetPass = false;

     this.utilService.message(typeMessage.success,'Password cambiada correctamente');

     this.router.navigate([`/login`]);

  }
  catch(ex){
    this.isSubmittedResetPass = false;
  }

}
  
get email() { return this.sendEmailForm.get('email'); }

get code() { return this.sendresetPassword.get('code'); }

get password() { return this.sendresetPassword.get('password'); }

get passwordRepeat() { return this.sendresetPassword.get('passwordRepeat'); }

}
