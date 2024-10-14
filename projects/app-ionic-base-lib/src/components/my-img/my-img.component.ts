import { Component,  Input, OnInit } from '@angular/core';
import { MyHttpService, classHttp } from '../../services/my-http.service';

@Component({
  selector: 'my-img',
  templateUrl: './my-img.component.html',
  styleUrls: ['./my-img.component.scss'],
})
export class MyImgComponent  implements OnInit { 


  imgUrl : any;
  isDownloading=false;

  @Input() set  set_fileid(value: any){
    try{
      if(value){
        this.isDownloading = true;
        const objHttp: classHttp = new classHttp('get', this.entityName, null,'', null, value);      
        this.myHttpService.ejecuteURL(objHttp).then(resp => {
          this.isDownloading = false;
          if(resp){
  
            const arr = new Uint8Array(resp.myData.split(',').map(z=> parseInt(z)));
    
           const blob = new Blob([arr], { type: resp.contenttype });  
            //  const blob = new Blob([arr], { type: 'application/octet-stream' }); 
    
            this.imgUrl = window.URL.createObjectURL(blob);          
    
          }
        })
      }

    }
    catch(ex){
      this.isDownloading = false;
    }
    
  }
  



  entityName = 'Documentos';
  

  constructor(
    private myHttpService: MyHttpService,
  ) { }

  ngOnInit() {}

}
