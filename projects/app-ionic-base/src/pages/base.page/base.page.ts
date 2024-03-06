import { Component, OnInit } from '@angular/core';
import { MyHttpService, classHttp } from '../../services/my-http.service';
import { SeguridadService } from '../../services/seguridad.service';


@Component({  
  template: '',  
})
export class BasePage    {

  objPagFilterOrder : any;

  colums = [];

  isLoading = false;
  entitySelected: any;

  entityName = '';

  lstPrincipal : any[];

  tableRefresh : any;

  user: any;


  constructor(
    public myHttpService: MyHttpService,
    public seguridadService: SeguridadService,
  ) {
   }

   async Init() {
   this.user = this.seguridadService.UserGet();
   }


   async getUsers() {
    if(!this.user.isAdmin) return;

    const objPagFilterOrder = {
      pagination: null,
      columns: [
        { name: 'id', prop: 'id', type: 'number', filterInit: ' "estadoid" <> 2' },
        { name: 'name', prop: 'name', type: 'text', OrderInit: 'ASC' },
      ],
      mode: 'C'
    };

    const objHttp: classHttp = new classHttp('get', 'user',objPagFilterOrder);    
    const resp = await this.myHttpService.ejecuteURL(objHttp);

    resp?.data.unshift({id: -1, name : 'seleccione..'});

    return resp?.data;
  }

  async loadList(){
    try{
      const objHttp : classHttp = new classHttp('get',this.entityName, null);
      this.isLoading = true;
      this.lstPrincipal=[];
      this.lstPrincipal = await this.myHttpService.ejecuteURL(objHttp);
      this.isLoading=false;
    }
    catch(ex){
      this.isLoading=false;
    }
  }

  getTableRefresh(){
    this.tableRefresh = new Date().getTime();
  }


  selectItem(item){
    this.entitySelected = item;
  }

  async save(entity){
    //se ejecuta despues de guardar
    this.getTableRefresh();
  }

  async borrar(entity){
    //se ejecuta despues de guardar
    this.getTableRefresh();
  }

}
