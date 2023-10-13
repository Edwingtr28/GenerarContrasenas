import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = 'https://api.api-ninjas.com/v1/passwordgenerator'; //direccion de la API
  private apiKey = '7jOopObxQQGIN7DfjwRDJA==ZFqrj6BH8ydPMYRW'; //Codigo secreto

  constructor(private http: HttpClient) { }

  getPass(length: string, number: boolean, special: boolean): Observable<any> {
    //const url = `https://api.api-ninjas.com/v1/passwordgenerator?length=5&exclude_numbers=false`;
    // se forma por completo la direccion con los parametros
    const url = `${this.apiUrl}?length=${length}&exclude_numbers=${number}&exclude_special_chars=${special}`;
    const headers = new HttpHeaders().set('X-Api-Key', this.apiKey);
    //retorna la contraseña generada
    return this.http.get(url, { headers });    
  }
}
