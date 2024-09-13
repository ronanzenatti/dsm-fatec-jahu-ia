import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { UserPhoto } from '../models/UserPhoto';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {


  public photos: UserPhoto[] = [];

  constructor() { }

  public async addNewToGallery() {
    // Verifica permissão

    const statusCamera = await Camera.checkPermissions();
    console.log(statusCamera);

    if (statusCamera.camera == 'denied') {
      alert("Acesso a Câmera Negado! \n Libere o acesso para continuar");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const permissions = await Camera.requestPermissions();
    } else {
      // Take a photo
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 70,
        allowEditing: true,
        saveToGallery: true
      });

      this.photos.unshift({
        filepath: "soon...",
        webviewPath: capturedPhoto.webPath!
      });
    }
  }

}
