import { Component, OnInit } from '@angular/core';
import { ServicesService } from './Servicios/services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GenerarContrasenas';
  formContrasena: FormGroup;
  mostrarModal = false;


  //llamamos el servicio en el constructor
  constructor(private Services: ServicesService, private fb: FormBuilder, public dialog: MatDialog) 
  {
    //validaciones del form 
    this.formContrasena = this.fb.group({
    cant: ['', Validators.required],
    numbers: [''],
    charspecials: [''],
  });

  }

  //variables de los toogles

  toogleNumbers = false;
  toogleSpecials = false;
  
  

  ngOnInit(): void {
    this.toogleSpecials = false;
  }

  Contrasena: string = "";
  //funcion que se llama por medio del boton
  generatepassword() {
    //tamaño de la contrasena
    const lengthPassword = this.formContrasena.value.cant;
    //opcion de numeros
    if (this.formContrasena.value.numbers == true) {
      this.toogleNumbers = false;
    }
    else
    {
      this.toogleNumbers = true;
    }
   
    //opcion de caracteres especiales
    this.toogleSpecials = this.formContrasena.value.charspecials;
    if (this.formContrasena.value.charspecials == true) {
      this.toogleSpecials = false;      
    }
    else
    {
      this.toogleSpecials = true;
    
    }
    //llamado del servicio que llama a la API
    this.Services.getPass(lengthPassword,this.toogleNumbers, this.toogleSpecials ).subscribe(
      (result) => {
        console.log(result);
        //aqui obtenemos la respuesta y buscamos la clave para guardarlo en la variable contrasena y mostrarlo en html
        if ('random_password' in result) {
          // busca random_password en el json
          let randomPassword = result['random_password'];
          this.Contrasena = randomPassword;
          this.Message = "Su contraseña es:";
          this.openModal();
          
        } else {
          console.error('La propiedad "random_password" no está presente en la respuesta de la API.');
        }
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
  }
  
  Message: string = "";
  mostrarModalMessage: boolean = false;
  openModal(): void {
    this.mostrarModal = true;
  }

  closeModal(): void {
    this.mostrarModal = false;
    this.Message = "";
    this.toogleNumbers = false;
    this.toogleSpecials = false;
    this.formContrasena.value.cant = "";
  }

  Statenumber:boolean = true;
  MessageToogle(){
    console.log("change");
    if (this.Statenumber == false) {
      this.Message = "Su contraseña NO va a incluir numeros";
      this.mostrarModalMessage = true;
      this.Statenumber = true;
    }
    else
    {
      this.Message = "Su contraseña va a incluir numeros"; 
      this.mostrarModalMessage = true;
      this.Statenumber = false;
    }
  }

  StateSpecial:boolean = true;
  MessageToogleSpecial(){
    if (this.StateSpecial == false) {
      this.Message = "Su contraseña NO va a incluir caracteres especiales";
      this.mostrarModalMessage = true;
      this.StateSpecial = true;
    }
    else
    {
      this.Message = "Su contraseña va a incluir caracteres especiales"; 
      this.mostrarModalMessage = true;
      this.StateSpecial = false;
    }
  }

  closeModaltoogle(): void {
    this.mostrarModalMessage = false;
    this.Message = "";
  }
}
