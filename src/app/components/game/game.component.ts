import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WordService } from '../../services/word.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  wordList: string[] = [];
  targetWord: string = '';
  attempts: string[] = [];
  maxAttempts: number = 6;
  guessArray: string[] = Array(5).fill('');

  guessForm: FormGroup;

  constructor(private wordService: WordService) {
    this.guessForm = new FormGroup({
      guess: new FormControl('')
    });
  }

  async ngOnInit() {
    this.wordList = await this.loadWords();
    await this.pickRandomWord();
  }

  

  loadWords(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.wordService.getWords().subscribe(
        (words: string) => resolve(words.split('\n').map(word => word.trim().toLowerCase())),
        (error) => reject(error)
      );
    });
  }

  async pickRandomWord() {
    let wordValid = false;

    while (!wordValid) {
      const randomIndex = Math.floor(Math.random() * this.wordList.length);
      const randomWord = this.wordList[randomIndex];

      try {
        const data = await this.wordService.checkWordTDK(randomWord).toPromise();
        if (data && data.length > 0) {
          this.targetWord = randomWord;
          wordValid = true;
          console.log('Günlük kelime belirlendi:', this.targetWord);
        } else {
          console.log('Kelime TDK’da bulunamadı, başka kelime seçiliyor.');
        }
      } catch (error) {
        console.error('Kelime kontrolü sırasında bir hata oluştu:', error);
      }
    }
  }

  checkGuess() {
    const currentGuess = this.guessArray.join('').trim().toLowerCase();
    console.log(currentGuess);

    if (currentGuess.length !== 5) {
      alert('Tahmin edilen kelime 5 harfli olmalı!');
      return;
    }

    if (this.attempts.length >= this.maxAttempts) {
      alert('Deneme hakkınız bitti!');
      return;
    }

    this.attempts.push(currentGuess);

    if (currentGuess === this.targetWord) {
      alert('Tebrikler, doğru tahmin ettiniz!');
    } else {
      alert('Yanlış tahmin, tekrar deneyin!');
    }

    this.guessArray = Array(5).fill('');
  }

  handleKeyboardInput(letter: string) {
    const currentIndex = this.getCurrentPosition();
    if (letter === 'DELETE') {
      if (currentIndex > 0) {
        this.guessArray[currentIndex - 1] = ''; 
      }
    } else if (letter === 'SUBMIT') {
      this.checkGuess();
    } else if (this.getCurrentPosition() < 5) {
      this.guessArray[this.getCurrentPosition()] = letter;
    }
  }
  

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const letter = event.key.toLowerCase();
    if (letter === 'backspace') {
      this.handleKeyboardInput('DELETE');
    } else if (letter === 'enter') {
      this.handleKeyboardInput('SUBMIT');
    } else if (/[a-z]/.test(letter)) {
      this.handleKeyboardInput(letter);
    }
  }

  getCurrentPosition(): number {
    const index = this.guessArray.findIndex(letter => letter === '');
    return index === -1 ? this.guessArray.length : index;
  }
}
