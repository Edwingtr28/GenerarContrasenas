import { Component, OnInit } from '@angular/core';
import { ServicesService } from './Servicios/services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GenerarContrasenas';

  //llamamos el servicio en el constructor
  constructor(private Services: ServicesService) {}

  ngOnInit(): void {
    
  }

  //funcion que se llama por medio del boton
  generatepassword() {
    //tamaño de la contrasena
    const lengthPassword = '20';
    //opcion de numeros
    const ExcludeNumbers = true;
    //opcion de caracteres especiales
    const SpecialChars = true;
    //llamado del servicio que llama a la API
    this.Services.getPass(lengthPassword).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
  }
  
}
