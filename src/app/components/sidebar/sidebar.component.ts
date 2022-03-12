import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public searchString: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.searchString = '';
  }

  ngOnInit(): void {
  }

  goSearch(){
    this._router.navigate(['/buscar', this.searchString])
  }

}
