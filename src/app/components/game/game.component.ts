import { Component, OnInit } from '@angular/core';
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
        (words) => resolve(words),
        (error) => reject(error)
      );
    });
  }

  async pickRandomWord() {
    let wordValid = false;

    while (!wordValid) {
      const randomIndex = Math.floor(Math.random() * this.wordList.length);
      const randomWord = this.wordList[randomIndex].trim().toLowerCase();

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
    const currentGuess = this.guessForm.get('guess')?.value.trim().toLowerCase();

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
    
    this.guessForm.reset(); // Formu sıfırla
  }
}
