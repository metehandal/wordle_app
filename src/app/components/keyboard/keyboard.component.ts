import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {
  @Input() keyboardLetterColors: { [key: string]: string } = {};  // Renkleri input olarak al
  @Output() letterClicked = new EventEmitter<string>();

  // Türkçe klavye dizilimi
  row1 = 'ERTYUIOPĞÜ'.split('');
  row2 = 'ASDFGHJKLŞİ'.split('');
  row3 = 'ZXCVBNMÖÇ'.split('');

  onLetterClick(letter: string) {
    this.letterClicked.emit(letter);
  }

  onDeleteClick() {
    this.letterClicked.emit('DELETE');
  }

  onSubmitClick() {
    this.letterClicked.emit('SUBMIT');
  }

  getColorForKey(letter: string): string {
    return this.keyboardLetterColors[letter] || '';  // Varsayılan rengi boş bırak
  }
}
