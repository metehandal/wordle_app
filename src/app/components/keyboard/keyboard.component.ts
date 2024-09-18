import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {
  @Output() letterClicked = new EventEmitter<string>();

  // Türkçe klavye dizilimi
  row1 = 'ertyuıopğü'.split('');
  row2 = 'asdfghjklşi'.split('');
  row3 = 'zxcvbnmöç'.split('');

  onLetterClick(letter: string) {
    this.letterClicked.emit(letter);
  }

  onDeleteClick() {
    console.log('DELETE');
    this.letterClicked.emit('DELETE');
  }

  onSubmitClick() {
    this.letterClicked.emit('SUBMIT');
  }
}
