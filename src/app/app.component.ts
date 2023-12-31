import { Component, OnInit,HostListener  } from '@angular/core';
import { ServicesService } from './Servicios/services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { ClipboardService } from 'ngx-clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GenerarContrasenas';
  formContrasena: FormGroup;
  mostrarModal = false;
  toogleNumbers = false;
  toogleSpecials = false;
  Contrasena: string = "";
  Message: string = "";
  mostrarModalMessage: boolean = false;
  Statenumber:boolean = false;
  StateSpecial:boolean = false;
  isMobile: boolean = false;

  //evento para saber si esta en mobile
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();}

  //llamamos el servicio en el constructor y otras librerias necesarias
  constructor(private Services: ServicesService, private fb: FormBuilder, public dialog: MatDialog, 
    private clipboardService: ClipboardService, private snackBar: MatSnackBar) 
  {
    //validaciones del form 
    this.formContrasena = this.fb.group({
    cant: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
    numbers: [''],
    charspecials: [''],
  });

  //define el tamaño para saber cuando es mobile
  }
   checkScreenSize() {
    this.isMobile = window.innerWidth < 600; 
  }

  ngOnInit(): void {
    //llama la funcion del mobile de entrada
    this.checkScreenSize();
  }

  //funcion que se llama por medio del boton generar
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
        //aqui obtenemos la respuesta y buscamos la clave para guardarlo en la variable contrasena y mostrarlo en html
        if ('random_password' in result) {
          // busca random_password en el json
          let randomPassword = result['random_password'];
          this.Contrasena = randomPassword;
          this.Message = "Su contraseña es:";
          this.openModal();
          
        } else {
          console.error('"random_password" no está presente en la respuesta de la API.');
          this.MessageFailConection();
        }
      },
      (error) => {
        console.error('Error: ', error);
        this.MessageFailConection();
      }
    );
  }
  
  //modales y mensajes
  openModal(): void {
    this.mostrarModal = true;
  }

  closeModal(): void {
    this.mostrarModal = false;
    this.Message = "";
    this.toogleNumbers = false;
    this.toogleSpecials = false;
    this.formContrasena.reset();
    this.StateSpecial = false;
    this.Statenumber = false;
    
  }
  
  MessageToogle(){
    this.Statenumber = !this.Statenumber;
    if (this.Statenumber == false) {
      this.Message = "Su contraseña 'NO' va a incluir números";
      this.mostrarModalMessage = true;  
    }
    else
    {
      this.Message = "Su contraseña va a incluir números"; 
      this.mostrarModalMessage = true;
    }
  }

  
  MessageToogleSpecial(){
    this.StateSpecial = !this.StateSpecial;
    if (this.StateSpecial == false) {
      this.Message = "Su contraseña 'NO' va a incluir caracteres especiales";
      this.mostrarModalMessage = true;
    }
    else
    {
      this.Message = "Su contraseña va a incluir caracteres especiales"; 
      this.mostrarModalMessage = true;
    }
  }

  MessageFailConection(){
    this.Message = "Lo sentimos, no podemos generar una contraseña en este momento.";
    this.mostrarModalMessage = true;
  }

  closeModaltoogle(): void {
    this.mostrarModalMessage = false;
    this.Message = "";
  }
  
  // para copiar la clave en el porta papeles
  copyText() {
    this.clipboardService.copyFromContent(this.Contrasena);
    //mensaje de texto copiado
    this.snackBar.open("Contraseña copiada", "cerrar", {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top', 
      panelClass: ['blue-snackbar']
    });
  }

  //evento para determinar si lleva un caracter
  onInputChange(event: any): void {
    const valorActual = event.data;
  const NMA = valorActual.includes('+');
  const nme = valorActual.includes('-');
  const e = valorActual.includes('e');
  const p = valorActual.includes('.');

  if (NMA || nme || e || p) {
  const p = valorActual.includes('.');
    this.Message = `El valor: '${valorActual}' no está permitido. Solo se permiten números`;
    this.mostrarModalMessage = true;
    this.formContrasena.reset();
  }
  if (parseInt(this.formContrasena.value.cant) <= 0) {
    this.Message = "La cantidad debe ser mayor a: "+ valorActual;
    this.mostrarModalMessage = true;
    this.formContrasena.reset();
  }
  if (parseInt(this.formContrasena.value.cant) > 50) {
    this.Message = "La cantidad debe ser menor a: 50" ;
    this.mostrarModalMessage = true;
    this.formContrasena.reset();
  }
  }

}
