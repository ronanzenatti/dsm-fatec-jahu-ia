import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-analise',
  templateUrl: './analise.page.html',
  styleUrls: ['./analise.page.scss'],
})
export class AnalisePage implements OnInit {


  // Data passed in by componentProps
  @Input() captions: string | undefined;
  @Input() confidence: number | undefined;
  @Input() tags: string[] | undefined;

  constructor(public modalController: ModalController) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    /*
    const percent = Number(this.confidence) * 100;
    this.confidence = percent.toFixed(2) + '%';
    */
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
