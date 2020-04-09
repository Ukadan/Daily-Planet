import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../news.service';
import { CategoryService } from '../category.service';
import { Categories } from '../category/category'
import { News } from '../news-list/news';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  item: News;
  items: News[];
  categories: Categories;
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
    const id = +this.route.snapshot.paramMap.get('category_id');
    this.newsService.getNewsByCategoryId(id).subscribe(items => this.items = items);
  }

}
