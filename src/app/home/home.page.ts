import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { ActionSheetController, LoadingController, ModalController } from '@ionic/angular';
import { UserPhoto } from '../models/UserPhoto';
import { AzureAiService } from '../services/azure-ai.service';
import { AnalisePage } from '../modals/analise/analise.page';
import { TagPage } from '../modals/tag/tag.page';
import { FacePage } from '../modals/face/face.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController,
    public azureai: AzureAiService,
    public modalController: ModalController,
    public loadingController: LoadingController
  ) { }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Escolha uma Opção',
      mode: 'ios',
      buttons: [
        {
          text: 'Análise de Imagem',
          icon: 'eye-outline',
          handler: () => {
            this.detalhesImagem(photo);
          }
        },
        {
          text: 'Itens na Imagem',
          icon: 'pricetags-outline',
          handler: () => {
            this.itensImagem(photo);
          }
        },
        {
          text: 'Deletar',
          role: 'destructive-outline',
          icon: 'trash-outline',
          handler: () => {
            this.photoService.deletePicture(photo, position);
          }
        }, {
          text: 'Cancelar',
          icon: 'close-circle-outline',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
          }
        }]
    });
    await actionSheet.present();
  }

  async detalhesImagem(photo: UserPhoto) {
    const loading = await this.loadingController.create({
      message: 'Analisando...',
    });
    await loading.present();

    const analise = await this.azureai.detalhesImagem(await this.photoService.getBlob(photo));

    const modal = await this.modalController.create({
      component: AnalisePage,
      componentProps: analise,
    });
    await loading.dismiss();
    return await modal.present();
  }

  async itensImagem(photo: UserPhoto) {
    const loading = await this.loadingController.create({
      message: 'Analisando...',
    });
    await loading.present();

    const tagsImage = await this.azureai.tagsImagem(await this.photoService.getBlob(photo));

    const modal = await this.modalController.create({
      component: TagPage,
      componentProps: { tagsImage },
    });
    await loading.dismiss();
    return await modal.present();
  }

  async analiseFace(photo: UserPhoto) {
    const loading = await this.loadingController.create({
      message: 'Analisando...',
    });
    await loading.present();

    const dadosRosto = await this.azureai.analiseFace(await this.photoService.getBlob(photo));

    const modal = await this.modalController.create({
      component: FacePage,
      componentProps: { dadosRosto },
    });
    await loading.dismiss();
    return await modal.present();
  }
}
/*
  {
          text: 'Análise de Rosto',
          icon: 'person-circle-outline',
          handler: () => {
            this.analiseFace(photo);
          }
        },
*/
