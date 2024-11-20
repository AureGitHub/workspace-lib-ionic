import { Component, OnInit } from '@angular/core';
import { MyHttpService, MyHttpService_EXEC, classHttp } from '../../services/my-http.service';
import { SeguridadService } from '../../services/seguridad.service';
import { BasePageService } from './base.page.service';


@Component({  
  template: '',  
})
export class BasePage    {

  // objeto para realizar consultas
  objPagFilterOrder : any;

  // columnas de una tabla
  colums = [];

  isLoading = false;
  // entidad que se selecciona al seleccionar una fila de la tabla
  entitySelected: any;

  // entidad de la BD que se trata en la página (ej Apuesta)
  entityName = '';

  //lista para almacenar los valores obtenidos en la consulta
  lstPrincipal : any[];

  // para poder refrescar la página
  tableRefresh : any;

  // usuario conectado
  user: any;

  // pk general para todas las tablas
  pk = 'id';

  myHttpService = this.basePageService.myHttpService;
  seguridadService = this.basePageService.seguridadService;
  myHttpService_EXEC = this.basePageService.myHttpService_EXEC;
  utilService = this.basePageService.utilService;
  alertController = this.basePageService.alertController;
  constructor(
    public basePageService: BasePageService
  ) {
   }

   // Obtiene el usuario
   async Init() {
   this.user = this.seguridadService.UserGet();   
   }


   // obtiene una lista de usuarios
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

  // carga la lista de la entidad. Llama al métod get del server (isLoading)
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

  // al invocarlo, refresca la tabla
  getTableRefresh(){
    this.tableRefresh = new Date().getTime();
  }


  // al seleccionar un item de la tabla
  selectItem(item){
    this.entitySelected = item;
  }

  // no tengo muy claro para que usarlo
  async save(entity){
    //se ejecuta despues de guardar
    this.getTableRefresh();
  }

  // no tengo muy claro para que usarlo
  async borrar(entity){
    //se ejecuta despues de guardar
    this.getTableRefresh();
  }

}
