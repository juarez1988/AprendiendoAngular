import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from '../../services/article.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ArticleService]
})
export class BlogComponent implements OnInit {

  public title: string;
  public articles: Article[];
  public url: string;

  constructor(
    private _articleService: ArticleService
  ) {
    this.title = 'Blog';
    this.articles = [];
    this.url=Global.url;
  }

  ngOnInit(): void {
    this._articleService.getArticles().subscribe(
      response => {
        if(response.articles){
          this.articles = response.articles;
        }else{}
      },
      error => {
        console.log(error);

      }
    );
  }

}
