import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = 'https://api.api-ninjas.com/v1/passwordgenerator'; 
  private apiKey = '7jOopObxQQGIN7DfjwRDJA==ZFqrj6BH8ydPMYRW'; 

  constructor(private http: HttpClient) { }

  getPass(length: string, number: boolean, special: boolean): Observable<any> {
    try {
      // se forma por completo la direccion con los parametros
      const url = `${this.apiUrl}?length=${length}&exclude_numbers=${number}&exclude_special_chars=${special}`;
      //coloca la contraseña para poder utilizar la API
      const headers = new HttpHeaders().set('X-Api-Key', this.apiKey);
  
      //retorna la contraseña generada
      return this.http.get(url, { headers }).pipe(
        catchError((error: any) => {
          console.error('Error occurred:', error);
          return throwError(error); 
        })
      );
    } catch (error) {
      console.error('Unexpected error occurred:', error);
      return throwError(error); 
    }  
  }
}
