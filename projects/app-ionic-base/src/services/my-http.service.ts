import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SeguridadService } from './seguridad.service';
import { Router } from '@angular/router';
import { UtilService } from './util.service';
import { typeMessage } from './enum.service';



export class classHttp {
    constructor(
        protocol: string,
        entity: string,
        objPagFilterOrder: any,
        method: string = null,
        form: any = null,
        param: string = null,
        query: string = null

    ) {

        this.protocol = protocol;
        this.entity = entity;
        this.objPagFilterOrder = objPagFilterOrder;
        this.method = method;
        this.param = param;
        this.query = query;
        this.form = form;

    }
    protocol: string;
    entity: string;
    objPagFilterOrder: any;
    method: string;
    param: string;
    query: string;
    form: any
}



@Injectable({
    providedIn: 'root'
})
export class MyHttpService {
    
    url = `${this.environment.server}/api/`;    
    app = this.settings.app;
    entities: any;


    constructor(
        private http: HttpClient,
        private seguridadService: SeguridadService,
        private router: Router,    
        private utilService: UtilService,
        @Inject('env') private environment,
        @Inject('settings') private settings,


    ) {

    }



    async ejecuteURL(o: classHttp) {
        const auth_token = this.seguridadService.UserGet() ? this.seguridadService.UserGet().token : '';
        // o.app = o.method == 'login' ? 'general' : this.app  ;  // puedo hacer que en la url esté la app...o no (si está vacio no irá enla) 



        const { protocol } = o;
        this.url = `${this.environment.server}api/${this.app ? this.app + '/' : ''}${o.entity}${o.method ? '/' + o.method : ''}${o.param ? '/' + o.param : ''}${o.query ? '/?' + o.query : ''}`;

        let response = null;

        try {

            switch (protocol) {
                case 'get':
                    const objPagFilterOrder = JSON.stringify(o.objPagFilterOrder);
                    response = await this.http.get<any>(this.url,{ headers: { 'Authorization': `${auth_token}`, 'objPagFilterOrder' : `${objPagFilterOrder}` }, } ).toPromise();
                    break;

                case 'delete':
                    response = await this.http.delete<any>(this.url, { headers: { 'Authorization': `${auth_token}` } }).toPromise();
                    break;

                case 'post':
                    response = await this.http.post<any>(`${this.url}`, o.form, { headers: { 'Authorization': `${auth_token}` } }).toPromise();
                    break;

                case 'put':
                    response = await this.http.put<any>(`${this.url}`, o.form, { headers: { 'Authorization': `${auth_token}` } }).toPromise();
                    break;
              
            }

        }
        catch (error) {

            this.utilService.message(typeMessage.danger,`Se ha producido un error accediendo al servidor (${error.url}) (${error?.error?.message}) `);

            // alert(`${error.statusText}  ${error.error.message} (${error.url})`);
            return;

        }


        if (response.secure) {
            let { user, token } = response.secure;
            user.token = token;
            this.seguridadService.UserGuardar(user);
        }


        if (response && response.status == HttpStatusCode.RequestTimeout) {

            this.seguridadService.UserClear();
            this.router.navigate([`/`]);
            return null;

        }



        // todo OK
        if (response && response.status == HttpStatusCode.Ok) {
            return response.data;
        }

        //error 500 o de conflicto!!
        if (response) {
            alert(`${response.message} (${response.status})`)
            return response.data;
        }


        //aqui nunca debería llegar

        return response ? response.data : null;

    }


    async Get(id: any) {
        const method = 'Get';
        let urlParam = '';
        urlParam = `${this.url}${method}?id=${id}`;
        return await this.http.get<any>(urlParam).toPromise();
    }


    async getEntity(){

        const objHttp: classHttp = new classHttp('get', 'entities', null, null, null);
        this.entities = await this.ejecuteURL(objHttp);        
        
      }




}