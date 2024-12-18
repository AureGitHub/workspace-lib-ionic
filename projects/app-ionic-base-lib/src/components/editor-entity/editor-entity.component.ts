import { Component, Input, Output, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UtilService } from '../../services/util.service';
import { Role, typeMessage } from '../../services/enum.service';
import { MyHttpService, classHttp } from '../../services/my-http.service';
import { SeguridadService } from '../../services/seguridad.service';
import { Validators } from "@angular/forms";

@Component({
  selector: 'app-editor-entity',
  templateUrl: './editor-entity.component.html',
  styleUrls: ['./editor-entity.component.scss'],
})
export class EditorEntityComponent implements OnInit {



  @Input() WhoHasPermision = [Role.admin, Role.god]
  havePermision = false;

  formGroup: FormGroup;
  isAlta = false;
  isSaving = false;
  isDeleting = false;
  isEditing: boolean;
  lstEntityDescripcion: any;  // descripcion de la entidad (campos, tipos...)

  @Input() entityName: string;
  @Input() MostrarIconAdd = true;


  //para guardar las listas de los select
  //hya que mejorar el sistemas... crear un component lista
  objlstSelect = {};

  @Output() saveEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<true>();
  @Output() CancelEvent = new EventEmitter<true>();
  @Output() selectEvent = new EventEmitter<any>();

  // son los valores iniciales a la hora de crear una row.
  // por ejemplo, los FK de tablas padres (seria el id de Categoría a la hora de crear una opción)
  @Input() entityInitialValues: any = null;


  pk = 'id';  // me lo tengo que currar para que la coga del entityDescripcion
  isOpenModal = false;
  arrayFile: any[] = [];
  fileName = {};
  error = '';
  formGroupOK=false;
  anyTouched: boolean;
  oldValue: {};

  @Input() set entityRefresh(entityRefreh: any) {

    if (entityRefreh) {
      for (let pp in entityRefreh) {
        this.formGroup.controls[pp].setValue(entityRefreh[pp]);
      }
    }
  }




  @Input() set setEntity(id: number) {
    if (!id) return;
    this.management(id);
  }


  constructor(
    private alertController: AlertController,
    private utilService: UtilService,
    private myHttpService: MyHttpService,
    private seguridadService: SeguridadService,
    @Inject('settings') private settings,


  ) { }

  ngOnInit() {
    const user = this.seguridadService.UserGet();
    this.havePermision = this.WhoHasPermision.length==0 || this.WhoHasPermision.some(a => a == user.roleid);
  }



  /*
  Realiza la gestión del alta/modificacion de la entidad
  El objetivo es crear el formGroup a partir de la entidad
    Alta : entity?.id == 0
           Crea el formGroup a partir de entityDescripcion
           Asigna los valores por default en entityDescripcion
           Asigna los valores por default que se le pasan como entityInitialValues (ej fk de tabla father)
    Update : entity?.id != 0
            Obtiene los valores del SERVIDOR (GetById)
            Crea el formGroup a partir de estos valores
  */
  async management(id: number,  paramOptional : any = null) {

    this.formGroupOK = false;
    this.isOpenModal = true;
    this.isAlta = id == 0 ? true : false;

    this.entityName = paramOptional && paramOptional?.entityName ? paramOptional?.entityName : this.entityName;
    this.entityInitialValues = paramOptional && paramOptional?.entityInitialValues ? paramOptional?.entityInitialValues : this.entityInitialValues;
    

    const keyEntity_ = this.entityName.includes("public") ? `${this.entityName.split('/')[0]}."${this.entityName.split('/')[1]}"`  : this.entityName.replaceAll('/','.');

    

    console.log(this.myHttpService.entities);
    this.lstEntityDescripcion = this.myHttpService.entities[keyEntity_]; 
    if (!this.lstEntityDescripcion) {
      this.error = `No se han podido obtener los datos de la descripción (${this.entityName})`;
      return;
    }

    //establezco el formGroup a partir de entityDescripcion
    this.SetFormGroup();

    if (this.isAlta) {
      //es un ALTA
      await this.management_Alta();
      

    }
    else {
      await this.management_update(id);
    }

    this.CreateListForSelect();
 
  }


  //inicializa los valores de las fechas
  SetInitialDate(controlName: string) {
    const itemDescripcion = this.lstEntityDescripcion.find(a => a.name == controlName);

    if (itemDescripcion && itemDescripcion['type'] == 'date' || itemDescripcion['type'] == 'datetime' || itemDescripcion['type'] == 'time') {
      this.formGroup.controls[controlName].setValue(this.utilService.toISOString(new Date()));
      this.formGroup.controls[controlName].markAsTouched();;

    }

  }


  //asigna al formGroup los valores por defecto en el file de definición
  setValueByDefault(controlName: string) {
    const itemDescripcion = this.lstEntityDescripcion.find(a => a.name == controlName);
    //estableco los valores por defecto
    if (itemDescripcion && itemDescripcion.hasOwnProperty('default')) {
      this.formGroup.controls[controlName].setValue(itemDescripcion?.default);
      this.formGroup.controls[controlName].markAsTouched();

    }
  }


  //asigna al formGroup los valores que el negocio determina iniciales 
  // (ej: la fk del father en una relacion father => child)
  setInitialValues() {
    if (this.entityInitialValues) {
      for (const property in this.entityInitialValues) {
        this.formGroup.controls[property].setValue(this.entityInitialValues[property]);
        this.formGroup.controls[property].markAsTouched();
      }
    }
  }


  async management_Alta() {
    // iteracción del los controles del formGroup
    Object.keys(this.formGroup.controls).forEach((controlName: string) => {
      //estableco los valores por defecto
      this.setValueByDefault(controlName);
      this.SetInitialDate(controlName);      
      this.setInitialValues();
    });

   
    this.formGroupOK = true;

  }


  async getValueEnityFromServer(id: number){
    try{
      const protocol = 'get';
      const param = id.toString();    
      const objHttp: classHttp = new classHttp(protocol, this.entityName, null, null, null, param);
      const entityUpdate = await this.myHttpService.ejecuteURL(objHttp);
      return entityUpdate;
    }
    catch(err){
      throw new Error(`Se ha producido un erro obteniendo la información de la entidad (${err})`);      
    }
  }

  async management_update(id: number) {
    try {

      this.oldValue = {};

      const entityUpdate = await this.getValueEnityFromServer(id);
       //añado el id al formGroup      
       this.formGroup.addControl('id', new FormControl(''));
       this.formGroup.controls['id'].setValue(entityUpdate['id']);
       this.oldValue['id']=entityUpdate['id'];
       

 
       //set value from entity
       for (const property in entityUpdate) {       
        if (this.formGroup.controls[property]) {
          this.formGroup.controls[property].setValue(entityUpdate[property]);
          this.oldValue[property]=entityUpdate[property];
        }
      } 
      this.formGroupOK = true;

    } catch (error) {
      this.error = error;
    }  
  }



  //crea el formGroup a partir de entityDescripcion
  SetFormGroup() {
    this.formGroup = null;
    const group = {};
    this.lstEntityDescripcion.forEach(item => {
      // if(item?.noEdit) continue;
      group[item['name']] = new FormControl('');

      //establezco validators
      if (item.validators) {
        const validators = [];
        item.validators.forEach(val => {
          switch (val) {
            case 1: // requierd
              validators.push(Validators.required);
              break;
            case 2: // email
              validators.push(Validators.email);
              break;
          }
        });

        if (validators.length > 0) {
          group[item['name']].setValidators(validators);
        }

      }

    })
    this.formGroup = new FormGroup(group);
  }




  //crea las listas asociadas a fk con la información en entityDescripcion
  CreateListForSelect() {

    this.lstEntityDescripcion.forEach(async item => {
      if (item['type'] == 'select') {
        // coleccion: 'empleada', id : 'id', desc : 'nombre'

        this.objlstSelect[item['name']] = null;
        item['isLoading'] = true;

        const excluir = item?.excluir;


        const objPagFilterOrder = {
          pagination: null,
          columns: [
            { name: item['id'], prop: item['id'], type: 'number', filterInit: item['filterInit'] },
            { name: item['desc'], prop: item['desc'], type: 'text', OrderInit: 'DESC', filterInit: item['filterInit'] },
          ],
          mode: 'C'
        };




        const sourceColecction = item['noTC'] ? item['coleccion'] : 'types/' + item['coleccion'];

        const objHttp: classHttp = new classHttp('get', sourceColecction, objPagFilterOrder);
        const resp = await this.myHttpService.ejecuteURL(objHttp);
        let lstColeccion = resp.data;

        let lstTmpSelect = [{ id: null, desc: 'seleccione..' }];
        lstColeccion.forEach(it => {

          let annadir = true;

          if (item?.excluir) {
            if (item.excluir.some(a => a == it[item['desc']])) {
              annadir = false;
            }
          }

          if (annadir) {
            lstTmpSelect.push({
              id: parseInt(it[item['id']]),
              desc: it[item['desc']],
            })
          }
        })
        this.objlstSelect[item['name']] = lstTmpSelect;
        item['isLoading'] = null;;


      }

    })
  }



  toFormData() {
    const formData = new FormData();
    this.anyTouched = false;
    let lstControlNameInserted = [];
    Object.keys(this.formGroup.controls).forEach((controlName: string) => {      
      if(this.isAlta || (this.formGroup.controls[controlName].touched && this.formGroup.controls[controlName].value!= this.oldValue[controlName])){
        formData.append(controlName, this.formGroup.controls[controlName].value);
        lstControlNameInserted.push(controlName);
        this.anyTouched=true;
      }
      
    });

    //useAlways . Propiedades que siempre tienen que ir al servidor. Ej FK

    if(this.anyTouched){
      const lstEntityDescripcion_useAlways = this.lstEntityDescripcion.filter(a=> a?.useAlways);
      
    lstEntityDescripcion_useAlways.forEach(item => {
      if(!lstControlNameInserted.some(a=> a == item.name)){
        formData.append(item.name, this.formGroup.controls[item.name].value);
      }
    });
    }
    return formData;
  }


  async onSubmit() {

    try {
      this.lstEntityDescripcion.forEach(item => {
        if (item['type'] == 'date' || item['type'] == 'datetime' || item['type'] == 'time') {
          if (this.formGroup.controls[item['name']].dirty) {
            let date = this.utilService.toISOString(new Date(this.formGroup.controls[item['name']].value));
            this.formGroup.controls[item['name']].setValue(date)
          }
        }
      })

      this.isSaving = true;
      const protocol = this.isAlta ? 'post' : 'put';
      const param = this.isAlta ? null : this.formGroup.controls[this.pk].value.toString();
      const formData = this.toFormData();

      if(!this.anyTouched){
        this.utilService.message(typeMessage.success, 'No se ha modificado ningún dato');
        return;
      }

      const objHttp: classHttp = new classHttp(protocol, this.entityName, null, null, formData, param);
      const resp = await this.myHttpService.ejecuteURL(objHttp);
      this.isSaving = false;
      if (resp) { // verificar... no se si solo responde undefined cuando falla        
        this.isEditing = false;
        this.isAlta = false;
        this.isOpenModal = false;
        this.saveEvent.emit(resp?.entity);
      }


    }
    catch (err) {
      this.error=`Se ha producido un error realizando la operación (${err})`;
      this.isEditing = false;

    }
    finally{
      this.isSaving = false;
    }


  }




  async borrar() {
    const alert = await this.alertController.create({
      header: `Antención!! se va a borrar el elemento. ¿Continuar?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {


            this.isDeleting = true;
            const protocol = 'delete';
            const param = this.formGroup.controls[this.pk].value.toString();
            const objHttp: classHttp = new classHttp(protocol, this.entityName, null, '', null, param);
            const resp = await this.myHttpService.ejecuteURL(objHttp);

            this.isDeleting = false;
            if (resp) {
              this.isOpenModal = false;
              this.isEditing = false;
              this.deleteEvent.emit(resp?.entity);
            }


          },
        },
      ],
    });

    await alert.present();




  }

  cancelar() {
    this.isEditing = false;
    this.isOpenModal = false;
    this.CancelEvent.emit(true);
  }

  transformDate(date: Date) {
    let anno = date.getFullYear();
    let mounth = date.getMonth() + 1;
    let day = date.getDate();

    return `${anno}-${mounth < 10 ? '0' + mounth : mounth}-${day < 10 ? '0' + day : day}`;

  }

  select_onChange(field, event) {
    this.selectEvent.emit({ field, event });
  }

}
