import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Global } from '../../services/global';
import { ArticleService } from '../../services/article.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ArticleService]
})
export class SearchComponent implements OnInit {

  public title: string;
  public articles: Article[];
  public url: string;
  public searchString: string;

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = 'Búsqueda de artículos';
    this.articles = [];
    this.url=Global.url;
    this.searchString='';
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.searchString = params['search'];
      this._articleService.search(this.searchString).subscribe(
        response => {
          console.log(response.articles);
          if(response.articles){
            this.articles = response.articles;
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

}
