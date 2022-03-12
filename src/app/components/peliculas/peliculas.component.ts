import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Pelicula } from '../../models/pelicula';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers: [PeliculaService]
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {

  public titulo: string;
  public peliculas: Array<Pelicula>;
  public favorita: Pelicula;
  public fecha: any;

  constructor(
    private _peliculaService: PeliculaService
  ) {
    this.titulo = 'Películas';
    this.peliculas = this._peliculaService.getPeliculas();
    this.favorita = new Pelicula('',0,'');
    this.fecha = new Date(2021, 8, 21);

    console.log('CONSTRUCTOR lanzado!!');
  }

  ngOnInit(): void {
    console.log(this.peliculas);
    console.log(this._peliculaService.holaMundo());

  }

  ngDoCheck(): void {
    console.log('DoCheck landado!!');

  }

  ngOnDestroy(): void {
    console.log('El componente se va a eliminar');

  }

  cambiarTitulo(){
    this.titulo = 'El titulo ha sido cambiado';
  }

  mostrarFavorita(event: any){
    console.log(event.pelicula);
    this.favorita = event.pelicula;
  }
}
