import { Injectable } from "@angular/core";
import { Pelicula } from "../models/pelicula";

@Injectable()
export class PeliculaService{

  public peliculas: Array<Pelicula>;

  constructor(){
    this.peliculas=[
      new Pelicula("Spiderman Miles Morales", 2020, "https://static1.abc.es/media/tecnologia/2021/09/10/spiderman-kedC--620x349@abc.jpg"),
      new Pelicula("Los Vengadores Endgame", 2018, "https://as.com/meristation/imagenes/2019/06/19/noticias/1560972428_997226_1560972502_noticia_normal.jpg"),
      new Pelicula("Batman vs Superman", 2019, "https://www.giantfreakinrobot.com/wp-content/uploads/2021/04/batman-v-superman-900x506.jpg"),
      new Pelicula("Capitán América", 2015, "https://i0.wp.com/hipertextual.com/wp-content/uploads/2019/05/hipertextual-avengers-endgame-futuro-capitan-america-2019781893-scaled.jpg?fit=1200%2C750&ssl=1")
    ];
  }

  holaMundo(){
    return 'Hola mundo desde un servicio de Angular';
  }

  getPeliculas(){
    return this.peliculas;
  }

}
