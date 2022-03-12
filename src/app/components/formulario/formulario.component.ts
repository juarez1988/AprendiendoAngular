import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public title: string;
  public user: any;
  public campo: string;

  constructor() {
    this.title = 'Formulario';
    this.user = {
      nombre: '',
      apellidos: '',
      bio: '',
      genero: ''
    };
    this.campo = '';
  }

  ngOnInit(): void {
  }

  onSubmit(){
    alert('Formulario enviado');
    console.log(this.user);

  }

  hasDadoClick(){
    alert('Has dado click!!')
  }

  hasSalidoDelCampo(){
    alert("Has dado a Enter!!");
  }

}
