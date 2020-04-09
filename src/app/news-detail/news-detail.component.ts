import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {NewsService} from '../news.service';
import { News } from '../news-list/news';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  @Input() item: News;
  
  items: News[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private newsService: NewsService,
    private categoryService: CategoryService,
    private location: Location
  ) {
    this.router.events.subscribe((value =>{
      this.getOneNews();
    }));
   }

  //  getLike(){
  //    var p = +this.item.getLike();
  //    p++;
  //    this.newsService.getOneNews(p).subscribe(item => this.item = item);
  //  }
  //  getDislike(){
  //   var p = +this.item.getLike();
  //   p++;
  //   this.newsService.getOneNews(p).subscribe(item => this.item = item);
  //  }

  ngOnInit(): void {
    this.getOneNews();
  }

  getOneNews() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.newsService.getOneNews(id).subscribe(item => this.item = item);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.newsService.updateOneNews(this.item)
      .subscribe(item => this.item = item);
  }

  add(category_id: number, title: string, image: string, text: string, likes: number, dislikes: number ): void {
    category_id = 1;
    title = title.trim();
    image = image.trim();
    text = text.trim();
    likes = 0;
    dislikes = 0;
    if(!category_id || !title || !image || !text) {
      return;
    }
    this.newsService.addOneNews({category_id, title, image, text, likes, dislikes } as News)
    .subscribe(item => { this.items.push(item);
    });
  }

  delete(item: News): void {
    this.items = this.items.filter(h => h !== item);
    this.newsService.deleteOneNews(item).subscribe();
  }
}
