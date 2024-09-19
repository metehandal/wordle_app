import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  wordList: string[] = [];
  targetWord: string = '';
  targetWordData: any = {};

  constructor(private wordService: WordService) { }

  async ngOnInit() {
    this.wordList = await this.loadWords();
    await this.pickRandomWord();
  }


  loadWords(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.wordService.getWordsByPassword().subscribe(
        (words: string) => resolve(words.split('\n').map(word => word.trim().toLocaleLowerCase())), 
        (error) => reject(error)
      );
    });
  }

  async pickRandomWord() {
      const randomIndex = Math.floor(Math.random() * this.wordList.length);
      const randomWord = this.wordList[randomIndex];

      try {
        const data = await this.wordService.checkWordTDK(randomWord).toPromise();
        if (data && data.length > 0) {
          this.targetWord = randomWord;
          this.targetWordData = data[0];   console.log('Günlük kelime belirlendi:', this.targetWord);
        } else {
          console.log('Kelime TDK’da bulunamadı, başka kelime seçiliyor.' + randomWord);
        }
      } catch (error) {
        console.error('Kelime kontrolü sırasında bir hata oluştu:', error);
      }
    
  }

}
