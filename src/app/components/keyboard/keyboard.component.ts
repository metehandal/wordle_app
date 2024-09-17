import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {
  @Output() letterClicked = new EventEmitter<string>();

  letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

  onLetterClick(letter: string) {
    this.letterClicked.emit(letter);
  }

  onDeleteClick() {
    this.letterClicked.emit('DELETE');
  }

  onSubmitClick() {
    this.letterClicked.emit('SUBMIT');
  }
}
