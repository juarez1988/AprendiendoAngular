import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '../../services/global';
import swal from 'sweetalert';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService]
})
export class ArticleNewComponent implements OnInit {

  public article: Article;
  public status: string;
  public afuConfig: any;
  public url: string;
  public page_title: string;
  public is_edit: boolean;


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
      uploadAPI:  {
        url: Global.url+'upload-image'
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
    this.page_title = 'Creando artículo';
    this.is_edit = false;

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this._articleService.create(this.article).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = response.status;
          this.article = response.article;
          console.log(response);

          //Alerta antes de redireccionar
          swal(
            'Artículo creado!!',
            'El artículo se ha creado correctamente',
            'success'
          );


          this._router.navigate(['/blog']);

        } else {
          this.status = 'error';
          console.log('eeeee');
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

  imageUpload(data:any){
    console.log(data.body.image);
    let image_data = data.body;
    this.article.image = image_data.image;
  }

}
