import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from '../../services/seguridad.service';
import { UtilService } from '../../services/util.service';
import { MyHttpService, classHttp } from '../../services/my-http.service';

@Component({
  selector: 'my-file',
  templateUrl: './my-file.component.html',
  styleUrls: ['./my-file.component.scss'],
})
export class MyFileComponent  implements OnInit {



  @Input() fileName: string; 
  @Input() id: string; 
  @Input() entityName: string;

  

  constructor(
    private myHttpService: MyHttpService,
  ) { }

  ngOnInit() {}

  async donwLoadFile() {
    const queryString= `id=${this.id}&fileName=${this.fileName}`;
    const objHttp: classHttp = new classHttp('post', this.entityName, null, 'downloadFile', null, null,queryString);
    const resp = await this.myHttpService.ejecuteURL(objHttp);        
    const blob = new Blob([resp.content], { type: resp.contenttype });  
    const url= window.URL.createObjectURL(blob);
    
  window.open(url);



    }

}
