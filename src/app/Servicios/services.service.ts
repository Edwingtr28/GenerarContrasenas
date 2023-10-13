import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = 'https://api.api-ninjas.com/v1/passwordgenerator';
  private apiKey = '7jOopObxQQGIN7DfjwRDJA==ZFqrj6BH8ydPMYRW';

  constructor(private http: HttpClient) { }

  getPass(length: string): Observable<any> {
    const url = `${this.apiUrl}?length=${length}`;
    const headers = new HttpHeaders().set('X-Api-Key', this.apiKey);

    return this.http.get(url, { headers });
  }
}
