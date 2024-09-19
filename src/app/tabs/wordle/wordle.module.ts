import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { WordlePage } from './wordle.page';

import { WordlePageRoutingModule } from './wordle-routing.module';
import { MainModule } from '../../components/main.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WordlePageRoutingModule,
    MainModule
  ],
  declarations: [WordlePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WordlePageModule {}
