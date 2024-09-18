import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {
  @Output() letterClicked = new EventEmitter<string>();

  // Türkçe klavye dizilimi
  row1 = 'ERTYUİOPĞÜ'.split('');
  row2 = 'ASDFGHJKLŞİ'.split('');
  row3 = 'ZXCVBNMÖÇ'.split('');

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
