import { Component,  Input, OnInit } from '@angular/core';
import { MyHttpService, classHttp } from '../../services/my-http.service';

@Component({
  selector: 'my-file',
  templateUrl: './my-file.component.html',
  styleUrls: ['./my-file.component.scss'],
})
export class MyFileComponent  implements OnInit {



  @Input() fileid: string; 
  @Input() filename: string; 

  isDownloading=false;

  entityName = 'Documentos';
  

  constructor(
    private myHttpService: MyHttpService,
  ) { }

  ngOnInit() {}

  async donwLoadFile() {
    try{
      this.isDownloading = true;
            
      const objHttp: classHttp = new classHttp('get', this.entityName, null,'', null, this.fileid.toString());      
      const resp = await this.myHttpService.ejecuteURL(objHttp);   
      this.isDownloading = false;
      if(resp){

        const arr = new Uint8Array(resp.myData.split(',').map(z=> parseInt(z)));

       const blob = new Blob([arr], { type: resp.contenttype });  
        //  const blob = new Blob([arr], { type: 'application/octet-stream' });




        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.filename;
        link.click();

      }
      
    }
    catch(ex){
      this.isDownloading = false;
      alert('no img');
    }
    
    
  }

}
