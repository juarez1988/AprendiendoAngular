import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import swal from 'sweetalert';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {

  public title: string;
  public article: Article;
  public url: string;

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = 'Detalle artículo';
    this.article = new Article('','','','','');
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._articleService.getArticle(id).subscribe(
        response => {
          console.log('ahiiii: ',response.article);

          if(response.article){
            this.article = response.article;
          }else{
            //Es que no existe por lo tanto redirigimos a la home
            this._router.navigate(['/home']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/home']);
        }
      );
    });
  }

  delete(id:string){
    swal({
      title: "¿Estas seguro de eliminar el artículo?",
      text: "Una vez eliminado no podrás volver a recuperarlo y se perderá toda la información del mismo",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true
    })
    .then((willDelete) => {
      if (willDelete) {

        this._articleService.delete(id).subscribe(
          response => {
            if (response.status == 'success') {
              swal("El artículo ha sido eliminado!", {
                icon: "success",
              });
              this._router.navigate(['/blog']);
            } else {
              this._router.navigate(['/blog']);
            }
          },
          error => {
            this._router.navigate(['/blog']);
          }
        );
      } else {
        swal("Operación cancelada, nada se ha borrado");
      }
    });
  }
}
