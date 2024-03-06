import { Component, Input, Output, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UtilService } from '../../services/util.service';
import { Role } from '../../services/enum.service';
import { MyHttpService, classHttp } from '../../services/my-http.service';
import { SeguridadService } from '../../services/seguridad.service';
import { Validators } from "@angular/forms";

@Component({
  selector: 'app-editor-entity',
  templateUrl: './editor-entity.component.html',
  styleUrls: ['./editor-entity.component.scss'],
})
export class EditorEntityComponent implements OnInit {


  WhoHasPermision = [Role.admin, Role.god]
  havePermision = false;

  formGroup: FormGroup;
  isAlta = false;
  isSaving = false;
  isDeleting = false;
  isEditing: boolean;
  entityDescripcion: any;  // descripcion de la entidad (campos, tipos...)
  entity: any;             // valores de la entidad

  @Input() entityName: string;



  //para guardar las listas de los select
  //hya que mejorar el sistemas... crear un component lista
  objlstSelect = {};

  @Output() saveEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<true>();
  @Output() CancelEvent = new EventEmitter<true>();
  @Output() selectEvent = new EventEmitter<any>();


  pk = 'id';  // me lo tengo que currar para que la coga del entityDescripcion
  isOpenModal = false;

  @Input() set entityRefresh(entityRefreh: any) {

    if (entityRefreh) {
      for (let pp in entityRefreh) {
        this.formGroup.controls[pp].setValue(entityRefreh[pp]);
      }
    }
  }


  @Input() set setEntity(entity: any) {
    if (!entity) return;
    this.isAlta = false;
    this.isOpenModal = true;
    this.crearFormGroupyEntity(entity);
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
    this.havePermision = this.WhoHasPermision.some(a => a == user.roleid);
  }

  alta() {

    let newEntity = {};
    //establezco las fechas iniciales
    this.entityDescripcion = this.myHttpService.entities[this.entityName];
    if (!this.entityDescripcion) return;
    this.entityDescripcion.forEach(item => {
      if (item['type'] == 'date' || item['type'] == 'datetime' || item['type'] == 'time') {
        newEntity[item['name']] = this.utilService.toISOString(new Date());
      }
    })


    this.crearFormGroupyEntity(newEntity);


    this.isEditing = true;
    this.isAlta = true;
    this.isOpenModal = true;
  }

  async crearFormGroup() {

    this.formGroup = null;

    const group = {};

    this.entityDescripcion = this.myHttpService.entities[this.entityName];



    // for (let item of this.entityDescripcion) {
    this.entityDescripcion.forEach(item => {
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



    if (!this.entity) return;

    if (!this.entity['id']) {
      //si es alta, establezco los valores por defecto



      //algunos campos tienen que estar inicializado.. sobre todo las fechas
      this.entityDescripcion.forEach(item => {
        if (this.entity[item['name']]) {
          if(this.formGroup.controls[item['name']]){
            this.formGroup.controls[item['name']].setValue(
              this.entity[item['name']]
            );
          }
          
        }
      });

      this.entityDescripcion.forEach(item => {

        if (item.hasOwnProperty('default')) {
          if(this.formGroup.controls[item['name']]){
            this.formGroup.controls[item['name']].setValue(item['default']);
          }
          
        };


      })
    }
    else {

      //añado el id al formGroup      
      this.formGroup.addControl('id', new FormControl(''));
      this.formGroup.controls['id'].setValue(this.entity['id']);

      //set value from entity

      this.entityDescripcion.forEach(item => {
        if( this.formGroup.controls[item['name']]){
          this.formGroup.controls[item['name']].setValue(
            this.entity[item['name']]
          );
        }
        
      })
    }


    this.CreateListForSelect(this.entityDescripcion);


  }


  crearFormGroupyEntity(entity: any) {
    this.entity = entity;
    if (!this.entity) return;

    this.isEditing = true;

    this.crearFormGroup();


    if (!this.entity['id']) {

      //algunos campos tienen que estar inicializado.. sobre todo las fechas
      this.entityDescripcion.forEach(item => {
        if (this.entity[item['name']]) {
          this.formGroup.controls[item['name']].setValue(
            this.entity[item['name']]
          );
        }
      });

      this.entityDescripcion.forEach(item => {

        if (item.hasOwnProperty('default')) {
          this.formGroup.controls[item['name']].setValue(item['default']);
        };
      })
    }
    else {

      //añado el id al formGroup      
      this.formGroup.addControl('id', new FormControl(''));
      this.formGroup.controls['id'].setValue(this.entity['id']);

      //set value from entity

      this.entityDescripcion.forEach(item => {
        this.formGroup.controls[item['name']].setValue(
          this.entity[item['name']]
        );
      })
    }
  }


  CreateListForSelect(entityDiseno: any) {

    entityDiseno.forEach(async item => {
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




  async onSubmit() {

    try {
      this.entityDescripcion.forEach(item => {
        if (item['type'] == 'date' || item['type'] == 'datetime' || item['type'] == 'time') {
          if (this.formGroup.controls[item['name']].dirty) {
            let date = this.utilService.toISOString(new Date(this.formGroup.controls[item['name']].value));
            this.formGroup.controls[item['name']].setValue(date)
          }
        }
      })

      this.isSaving = true;
      const protocol = this.isAlta ? 'post' : 'put';
      const param = this.isAlta ? null : this.entity[this.pk].toString();
      const objHttp: classHttp = new classHttp(protocol, this.entityName, null, null, this.formGroup.value, param);
      const resp = await this.myHttpService.ejecuteURL(objHttp);
      this.isSaving = false;
      if (resp) { // verificar... no se si solo responde undefined cuando falla        
        this.isEditing = false;
        this.isAlta = false;
        this.isOpenModal = false;
        this.saveEvent.emit(this.formGroup.value);
      }


    }
    catch (e) {

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
            const param = this.entity[this.pk].toString();
            const objHttp: classHttp = new classHttp(protocol, this.entityName, null, '', null, param);
            const result = await this.myHttpService.ejecuteURL(objHttp);

            this.isDeleting = false;
            if (result) {
              this.isOpenModal = false;
              this.isEditing = false;
              this.deleteEvent.emit(this.formGroup.value);
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
