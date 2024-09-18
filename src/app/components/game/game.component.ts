import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WordService } from '../../services/word.service';
import { AlertController, ToastController } from '@ionic/angular';

interface Guess {
  letter: string;
  color: string; // 'green', 'yellow', or 'gray'
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  wordList: string[] = [];
  targetWord: string = '';
  attempts: Guess[][] = [];
  maxAttempts: number = 6;
  guessArray: string[] = Array(5).fill('');
  guessForm: FormGroup;

  constructor(private wordService: WordService, private toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.guessForm = new FormGroup({
      guess: new FormControl('')
    });
  }

  async ngOnInit() {
    this.wordList = await this.loadWords();
    await this.pickRandomWord();
  }

  getAttemptRows(): Guess[][] {
    const rows = [...this.attempts]; // Denenmiş kelimeleri al
    
    // Boş deneme satırlarını ekle
    while (rows.length < this.maxAttempts) {
      const emptyRow: Guess[] = Array(5).fill({ letter: '', color: 'gray' });
      rows.push(emptyRow);
    }
  
    return rows;
  }

  getEmptyAttemptRows(): any[] {
    const emptyRows = [];
    for (let i = this.attempts.length + 1; i < this.maxAttempts; i++) {
      emptyRows.push(Array(5).fill('')); // 5 harfli boş kutular
    }
    return emptyRows;
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

  async checkGuess() {
    const currentGuess = this.guessArray.join('').trim().toLowerCase();
  
    if (currentGuess.length !== 5) {
      const toast = await this.toastCtrl.create({
        message: 'Kelimelerin uzunluğu 5 harften oluşmalıdır.',
        duration: 2000,
        color: 'danger',
        position: 'top',
        animated: true,
      });
  
      toast.present();
      return;
    }
  
    const guessWithColors: Guess[] = currentGuess.split('').map((letter, index) => {
      if (letter === this.targetWord[index]) {
        return { letter, color: 'green' };
      } else if (this.targetWord.includes(letter)) {
        return { letter, color: 'yellow' };
      } else {
        return { letter, color: 'gray' };
      }
    });
  
    this.attempts.push(guessWithColors);
  
    if (currentGuess === this.targetWord) {
      const alert = await this.alertCtrl.create({
        header: 'Tebrikler!',
        message: 'Doğru tahmin ettiniz!',
        buttons: ['Tamam'],
      });
  
      await alert.present();
      return; 
    }
  
    if (this.attempts.length >= this.maxAttempts) {
      const alert = await this.alertCtrl.create({
        header: 'Deneme Hakkınız Bitti!',
        message: `Maalesef kelimeyi bulamadınız. Doğru kelime: ${this.targetWord}`,
        buttons: ['Tamam'],
      });
  
      await alert.present();
    }
  
    this.guessArray = Array(5).fill('');
  }
  
  

  handleKeyboardInput(letter: string) {
    if (letter === 'DELETE') {
      const currentPosition = this.getCurrentPosition() - 1;
      if (currentPosition >= 0) {
        this.guessArray[currentPosition] = ''; 
      }
    } else if (letter === 'SUBMIT') {
      this.checkGuess(); 
    } else if (this.getCurrentPosition() < 5) {
      this.guessArray[this.getCurrentPosition()] = letter.toUpperCase(); 
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
    return this.guessArray.findIndex(letter => letter === '');
  }
}
