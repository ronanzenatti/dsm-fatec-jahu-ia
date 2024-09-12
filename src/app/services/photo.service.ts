import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo, CameraPermissionState } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  permissionDenied: boolean = false;

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
    }


  }

  async checkCameraPermission() {
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'camera' as PermissionName });
      if (permissionStatus.state === 'denied') {
        this.permissionDenied = true;
        console.log('Permissão de câmera negada.');
      }
    } catch (error) {
      console.error('Erro ao verificar o status da permissão da câmera: ', error);
    }
  }
}
