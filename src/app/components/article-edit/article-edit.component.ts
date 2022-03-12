import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '../../services/global';
import swal from 'sweetalert';

@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})
export class ArticleEditComponent implements OnInit {

  public article: Article;
  public status: string;
  public afuConfig: any;
  public url: string;
  public is_edit: boolean;
  public page_title: string;

  constructor(
    private _articleService: ArticleService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.article = new Article('', '', '', '', null);
    this.status = 'success';
    this.afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg, .png, .gif, .jpeg",
      maxSize: 50,
      uploadAPI: {
        url: Global.url + 'upload-image'
      },
      theme: "attachPin",
      hideProgressBar: true,
      hideResetBtn: true,
      hideSelectBtn: false,
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Sube tu foto...',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !',
        sizeLimit: 'Size Limit'
      }
    };

    this.url = Global.url;
    this.is_edit = true;
    this.page_title = 'Editando artículo';

  }


  ngOnInit(): void {
    this.getArticle();
  }

  onSubmit() {
    this._articleService.update(this.article._id, this.article).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = response.status;
          this.article = response.article;
          console.log(response);
          //Alerta antes de redireccionar
          swal(
            'Artículo editado!!',
            'El artículo se ha editado correctamente',
            'success'
          );
          this._router.navigate(['/blog/articulo', this.article._id]);
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);

        //Alerta antes de redireccionar
        swal(
          'Edición fallida...',
          'El artículo no se ha editado correctamente :(',
          'error'
        );
        this.status = 'error';
      }
    );
  }

  imageUpload(data: any) {
    console.log(data.body.image);
    let image_data = data.body;
    this.article.image = image_data.image;
  }



  getArticle() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._articleService.getArticle(id).subscribe(
        response => {
          console.log('ahiiii: ', response.article);

          if (response.article) {
            this.article = response.article;
          } else {
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

}
