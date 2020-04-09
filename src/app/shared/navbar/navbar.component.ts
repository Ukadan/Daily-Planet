import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../category.service';
import {Categories} from '../../category/category';
import {NewsService} from '../../news.service';
import { News } from '../../news-list/news';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  news: News[];
  categories: Categories;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private newsService: NewsService,
    private categoryService: CategoryService
  ) {
    this.router.events.subscribe((valuer =>{
      this.getNews();
      this.getCategory();
    }));
   }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.newsService.getNewsByCategoryId(id).subscribe(news => this.news = news);
  }

  getCategory(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategory(id).subscribe(category => this.categories = category);

  }
}
//vhj