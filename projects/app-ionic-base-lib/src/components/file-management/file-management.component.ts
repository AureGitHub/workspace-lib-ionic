import { Component, Input, OnInit } from '@angular/core';
import { classHttp, MyHttpService } from '../../services/my-http.service';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.scss'],
})
export class FileManagementComponent  implements OnInit {



  @Input() controlName: string;

  formGroup: FormGroup;
  //id del documento  
  filename: string;
  arrayFile: any[] = [];
  controlOfiginalId: string;
  


  @Input() set setFormGroup(value :FormGroup){
    this.filename = '';
    if(!value) return;

    this.formGroup = value;

    //si tiene asociado documento
    if(this.formGroup.controls[this.controlName].value){
      //gestion para guardar al antiguo Id.. lo usaré para borrar el antiguo doc en caso de modificacion/borrado
      this.controlOfiginalId = this.controlName + '_oldId';
      if(! this.formGroup.controls[this.controlOfiginalId]){
        this.formGroup.addControl(this.controlOfiginalId, new FormControl(''));
      }
      this.formGroup.controls[this.controlOfiginalId].setValue(this.formGroup.controls[this.controlName].value);

      this.getValueDocumentFromServer();
    }

    

  }
  

  constructor(
    private myHttpService: MyHttpService,
   
  ) { }

  ngOnInit() {}


  async getValueDocumentFromServer() {
    try{
      const protocol = 'get';
      const param = this.formGroup.controls[this.controlName].value.toString();    
      const objHttp: classHttp = new classHttp(protocol, 'Documentos', null, null, null, param);
      const entityDoc = await this.myHttpService.ejecuteURL(objHttp);
      this.filename =entityDoc?.filename;
    }
    catch(err){
      throw new Error(`Se ha producido un erro obteniendo la información de la entidad (${err})`);      
    }
  }

  //este metoth se ejecuta cada vez que se selecciona un fichero
  onSelectFile(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]; // Here we use only the first file (single file)

    const controlNameFile = this.controlName + '_file';
    let obj = {};
    obj[controlNameFile] = file;
    if(! this.formGroup.controls[controlNameFile]){
      this.formGroup.addControl(controlNameFile, new FormControl(''));
    }

    this.formGroup.patchValue(obj);
    this.filename = file.name;

    //si YA HABÍA un file
    if(this.formGroup.controls[this.controlOfiginalId]){
      this.formGroup.controls[this.controlName].setValue(-2);
      this.formGroup.controls[this.controlOfiginalId].markAsTouched();
    }
    else{
      //alta de file. NO HABÍA
      this.formGroup.controls[this.controlName].setValue(-1);
    }
    
    
    this.formGroup.controls[this.controlName].markAsTouched();
    this.formGroup.controls[controlNameFile].markAsTouched();
    
    const a='';

  
  }


  borrarFile() {
    this.formGroup.controls[this.controlName].setValue(-1);
    this.filename = '';
    //-1 indica que se ha borrado    
  }





}
