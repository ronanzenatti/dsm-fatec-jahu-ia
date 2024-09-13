import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { ImageTag } from '@azure/cognitiveservices-computervision/esm/models';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.page.html',
  styleUrls: ['./tag.page.scss'],
})
export class TagPage implements OnInit {

  @Input() tagsImage: ImageTag[] | undefined;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    console.log(this.tagsImage);
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
