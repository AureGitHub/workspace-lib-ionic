import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Page } from '../../model/page';
import { MyHttpService, classHttp } from '../../services/my-http.service';
import { identifierName } from '@angular/compiler';


@Component({
  selector: 'my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss'],
})
export class MyTableComponent implements OnInit {


  @Output() saveEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();
  

  pagination = new Page();

  objPagFilterOrder: any;

  @Output() selecting = new EventEmitter<any>();   // al seleccionar una fila

  @Output() actionEmiter = new EventEmitter<any>();   // al seleccionar una fila

  @Output() onLoadDataEmiter = new EventEmitter<any>();   // al seleccionar una fila


  rowSelected = null;
  @Input() isLoading = false;

  @Input() entityName: string;
  @Input() title = '';
  @Input() columns = [];
  // true muestra la gestión  para poder dar de alta una entidad (+) y al seleccionar una fila muestra su edición
  @Input() withEntity = true;
  // true => cachea todas las filas. False => va al server para cada paginación
  @Input() withCache = false;


  @Input() pageSize: any;

  

  // lista de datos
  rows = [];

  //lista total de datos. Si se cachea, se obtienen todos los datos en la consulta y en  la paginación se obtienen de memoria
  rowCache = [];

  isModalOpenFilter = false;
  colSelectForFilter: any;
  filterText = '';
  messageError: string;

  filterargs = {visible: true};

@Input()  objNgClass:  any[];

@Input()  loadOnInit=false;

@Input()  canAddEntity=false;
@Input()  canUpdateEntity=false;


@Input()  entityInitialValues : any = null;





  @Input() set setRow(rows: any[]) {

    this.rows = this.formatRows(rows);
  }

  @Input() set refresh(value) {
    this.pagination.withCache = this.withCache;
    this.pagination.pageSize = this.pageSize ?  this.pageSize : this.settings.table.pageSize;
    this.pagination.limit = this.pageSize ?  this.pageSize : this.settings.table.pageSize;
    if (value) {
      this.ejecutaQuery();
    }

  }

  

  lstPaginacion = [];
  numberPagination: number;



  //pagina actual (ojo... indexada desde cero!!)
  pageActual = 1;

  //máximo filas en tabla

  //Total numeros de paginación (solo mostraré 5  => acutal  y dos menos y dos mas (si los hay!!!))



  constructor(
    public myHttpService: MyHttpService,
    @Inject('settings') private settings,
  ) {



  }


  ngOnInit() {
    this.pagination.withCache = this.withCache;
    this.pagination.pageSize = this.pageSize ?  this.pageSize : this.settings.table.pageSize;
    this.pagination.limit = this.pageSize ?  this.pageSize : this.settings.table.pageSize;

    if(this.loadOnInit){
      this.ejecutaQuery();
    }
    

  }


  onAction(action: any,row: any) {
    console.log('table , onAction')
    this.actionEmiter.emit({action, row});
    }

  // getNgClass(_t55: any): string|string[]|Set<string>|{ [klass: string]: any; } {
  //   throw new Error('Method not implemented.');
  //   }



  getNgClass(row: any, index):  any {    
    
    // if(this.isLoading){
    //   return "{'disabled': 1==1}";  
    // }

    if(!this.objNgClass) return;
    let obj = {};
    this.objNgClass.forEach(ngc=>{
      // const cadena =`row['${ngc.field}'] ${ngc.condicion}`;
      obj[ngc.class]=eval(ngc.condicion);

    })

     return obj;
    }



  eval(row: any, arg0: string): any {
    if(!arg0) return true;
    return eval(arg0);
    }


  /*
    Cuando:
        1- Primera consulta
        2- Ordena
        3- Filtra
    
      realiza consulta
      genera la paginación
  */
  async ejecutaQuery() {

    this.pagination.offset = 0;
    this.pageActual = 1;

    this.objPagFilterOrder = {
      pagination: this.pagination,
      columns: this.columns,
      mode: 'C'
    };
    
    this.rows = [];
    const count = await this.loadList('C');

    this.pagination.count = count;
    this.numberPagination = Math.trunc(this.pagination.count / this.pagination.limit);
    this.numberPagination += this.pagination.count % this.pagination.limit ? 1 : 0

    this.lstPaginacion = [];
    for (let i = 1; i <= this.numberPagination && i < 6; i++) {
      this.lstPaginacion.push(i);
    }


  }



  async ejecutaPaginacion(numberPage: number) {
    this.estableceLstPaginacion(numberPage);
    this.pagination.offset = numberPage - 1;
    this.objPagFilterOrder = {
      pagination: this.pagination,
      columns: this.columns,
      mode: 'P'
    };


    await this.loadList('P');

  }

  estableceLstPaginacion(numberPage: number) {

    if (this.pageActual == numberPage) return;
    this.pageActual = numberPage;
    //rehacer la lista de la pagination
    let pagTemp = [numberPage];

    //dos de delante
    if (numberPage - 1 > 0) {
      pagTemp.unshift(numberPage - 1);
    }

    if (numberPage - 2 > 0) {
      pagTemp.unshift(numberPage - 2);
    }

    //dos de delante
    if (numberPage + 1 <= this.numberPagination) {
      pagTemp.push(numberPage + 1);
    }
    if (numberPage + 2 <= this.numberPagination) {
      pagTemp.push(numberPage + 2);
    }

    const totalPagsInArr = pagTemp.length;

    //esto rellenaría hacia arriba
    const max = Math.max(...pagTemp);

    for (let i = 1; i <= 5 - totalPagsInArr; i++) {
      if (max + i <= this.numberPagination) {
        pagTemp.push(max + i);
      }

    }

    //esto rellenaría hacia abajo
    const min = Math.min(...pagTemp);

    for (let i = 1; i <= 5 - totalPagsInArr; i++) {
      if (min - i > 0) {
        pagTemp.unshift(min - i);
      }

    }

    this.lstPaginacion = pagTemp;


  }

  async loadList(mode: string) {


    this.messageError='';

    try{
      this.isLoading = true;
      this.pagination.withCache = this.withCache;

      this.rows = [];
  
      const objHttp: classHttp = new classHttp('get', this.entityName,this.objPagFilterOrder);
      if (mode == 'C') {
        const result = await this.myHttpService.ejecuteURL(objHttp);
        if (this.withCache) {
          this.rowCache = result.data;

          this.onLoadDataEmiter.emit(result.data);

          this.rows = this.rowCache.slice((this.pagination.offset * this.pagination.pageSize),(this.pagination.offset * this.pagination.pageSize) + this.pagination.pageSize);
        }
        else {
          this.rows = result.data;
        }
        this.isLoading = false;
        return result.count;
      }
      else if (mode == 'P'){
        if(this.withCache){
          this.rows = this.rowCache.slice((this.pagination.offset * this.pagination.pageSize),(this.pagination.offset * this.pagination.pageSize) + this.pagination.pageSize);
          console.log(this.rowCache);
        }
        else{
          const result = await this.myHttpService.ejecuteURL(objHttp);
          this.rows = result.data;
        }
        this.isLoading = false;
  
      }
  
     
      return -1;
    }
    catch(ex){
      this.isLoading = false;
      this.messageError='Problemas en el servidor. No se ha podido cargar la información'
    }

  }


  formatRows(rows: any[]): any[] {

    if (!rows) { return [] };
    rows.forEach(row => {
      this.columns.forEach(col => {
        if (row[col.prop] && col.type == 'text') {
          row[`${col.prop}_title`] = row[col.prop];
          row[col.prop] = row[col.prop].substring(0, 5).padEnd(8, '.')
        }
      })
    })

    return rows;
  }


  async onRowSelect(row: any) {

    if(!this.canUpdateEntity){
      return;
    }

    // console.log('table , onRowSelect');
    // const  entityDescripcion = this.myHttpService.entities[this.entityName];
    // //const  entityDescripcion = await this.myHttpService.getEntity(this.entityName);
    // if(!entityDescripcion) {
    //   this.selecting.emit(row);
    //   return; //si no hay enity, no se abre el editor
    // }





    if (this.rowSelected == row) {
      this.rowSelected = null;
    }
    else {
      this.rowSelected = row;
    }

    this.selecting.emit(this.rowSelected);

  }

  setOrder(colum) {
    if (!colum['order']) {
      colum['order'] = 'asc';

    }
    else {
      if (colum['order'] == 'asc') {
        colum['order'] = 'desc';
      }


      else if (colum['order'] == 'desc') {
        colum['order'] = null;
      }
    }

    this.ejecutaQuery();


  }

  setFilter(colum) {
    this.isModalOpenFilter = true;
    this.colSelectForFilter = colum;
    this.filterText = colum['filter'];

  }


  cancelFilter() {
    this.isModalOpenFilter = false;
  }

  borrarFilter() {
    this.isModalOpenFilter = false;
    this.colSelectForFilter['filter'] = '';
    this.ejecutaQuery();
  }

  ejecutaFiltar() {
    this.isModalOpenFilter = false;
    this.colSelectForFilter['filter'] = this.filterText;
    this.ejecutaQuery();
  }





}
