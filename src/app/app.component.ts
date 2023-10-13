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
    cant: ['', Validators.required],
    numbers: ['', [Validators.required]],
    charspecials: ['', [Validators.required]],
  });

  }
  toogleNumbers = true;

  ngOnInit(): void {
    
  }

  Contrasena: string = "";
  //funcion que se llama por medio del boton
  generatepassword() {
    //tamaño de la contrasena
    const lengthPassword = this.formContrasena.value.cant;
    //opcion de numeros
    this.toogleNumbers = this.formContrasena.value.numbers;
    console.log("se llamo number:", this.toogleNumbers);
    //opcion de caracteres especiales
    const SpecialChars = false;
    //llamado del servicio que llama a la API
    this.Services.getPass(lengthPassword,this.toogleNumbers, SpecialChars ).subscribe(
      (result) => {
        console.log(result);
        //aqui obtenemos la respuesta y buscamos la clave para guardarlo en la variable contrasena y mostrarlo en html
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
