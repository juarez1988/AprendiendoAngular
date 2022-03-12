export class Pelicula{

  /* PRIMERA FORMA */
  /*
    public title: string;
    public year: number;
    public image: string;

    constructor(title: string, year: number, image: string){
        this.title = title;
        this.year = year;
        this. image = image;
    }
    */

    /* FORMA OPTIMA DE TypeScript */
    constructor(
      public title: string,
      public year: number,
      public image: string
    ){}

}
