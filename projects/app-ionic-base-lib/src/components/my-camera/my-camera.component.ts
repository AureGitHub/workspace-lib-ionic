import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'my-camera',
  templateUrl: './my-camera.component.html',
  styleUrls: ['./my-camera.component.scss'],
})
export class MyCameraComponent  implements OnInit {


  isOpenModal = false;

  @Output()  public pictureTaken = new EventEmitter<WebcamImage>();
  @Output()  public CancelEvent = new EventEmitter<boolean>();
  

  // toggle webcam on/off
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  cancelar() {
    this.isOpenModal = false;
    this.CancelEvent.emit(true);
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }


  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }



  public handleImage(webcamImage: WebcamImage): void {
    this.pictureTaken.emit(webcamImage);
    
    this.webcamImage = webcamImage;
  }



  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }


}


