import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  constructor(private http: HttpClient) {}

  getWords(): Observable<string> {
    return this.http.get('assets/words.txt', { responseType: 'text' });
  }

  checkWordTDK(word: string): Observable<any> {
    return this.http.get<any>('https://sozluk.gov.tr/gts?ara=' + word);
  }
  

  getWordsByPassword() {
    return this.http.get('assets/full_words.txt', { responseType: 'text' });
  }
  
}


