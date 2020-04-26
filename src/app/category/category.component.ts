import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../category.service';
import {Categories} from './category';
import {NewsService} from '../news.service';
import { News } from '../news-list/news';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  items: News[];
  categories: Categories[]= [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private newsService: NewsService,
    private categoryService: CategoryService
  ) {
    this.router.events.subscribe((value =>{
      this.getNews();
    }))
   }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(){
    const category_id = +this.route.snapshot.paramMap.get('id');
    this.newsService.getNewsByCategoryId(category_id).subscribe(items => this.items = items);
  }
  getCategories(){
    this.categoryService.getCategories().subscribe(categories => {this.categories = categories});
  }
}
}
// ilblib