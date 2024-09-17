import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GameComponent } from './game/game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { KeyboardComponent } from './keyboard/keyboard.component';

@NgModule({
  declarations: [
    GameComponent,
    KeyboardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    GameComponent,
    KeyboardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule { }
