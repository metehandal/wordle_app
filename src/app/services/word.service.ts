import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  private tdkUrl = 'https://sozluk.gov.tr/gts?ara=';

  constructor(private http: HttpClient) {}

  getWords(): Observable<string[]> {
    return this.http.get('assets/words.txt', { responseType: 'text' })
      .pipe(
        map(data => data.split('\n').filter(word => word.trim().length === 5))
      );
  }

  checkWordTDK(word: string): Observable<any> {
    return this.http.get<any>(this.tdkUrl + word);
  }
}

