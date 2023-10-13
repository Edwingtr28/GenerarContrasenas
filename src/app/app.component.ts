import { Component, OnInit } from '@angular/core';
import { ServicesService } from './Servicios/services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GenerarContrasenas';
  formContrasena: FormGroup;

  //llamamos el servicio en el constructor
  constructor(private Services: ServicesService, private fb: FormBuilder) 
  {
    //validaciones del form 
    this.formContrasena = this.fb.group({
   // number: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
  });}

  ngOnInit(): void {
    
  }

  Contrasena: string = "";
  lengthPassword: number = 5;
  //funcion que se llama por medio del boton
  generatepassword() {
    //tamaño de la contrasena
    //const lengthPassword = this.formContrasena.value.number;
    console.log("result", this.lengthPassword);
    //opcion de numeros
    const ExcludeNumbers = true;
    //opcion de caracteres especiales
    const SpecialChars = true;
    //llamado del servicio que llama a la API
    this.Services.getPass(this.lengthPassword,ExcludeNumbers, SpecialChars ).subscribe(
      (result) => {
        console.log(result);
        //aqui buscamos la clave para guardarlo en la variable contrasena y mostrarlo en html
        if ('random_password' in result) {
          // busca random_password en el json
          let randomPassword = result['random_password'];
          this.Contrasena = randomPassword;
          
        } else {
          console.error('La propiedad "random_password" no está presente en la respuesta de la API.');
        }
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
  }
  
}
