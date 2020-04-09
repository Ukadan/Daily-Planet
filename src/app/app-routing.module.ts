import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router'
import {NewsListComponent} from './/news-list/news-list.component';
import {CategoryComponent} from './category/category.component';
import {NewsDetailComponent} from './news-detail/news-detail.component';
import {AboutComponent} from './shared/about/about.component';
const routes: Routes = [
  {path: '', redirectTo: 'about', pathMatch: 'full'},
  {path: 'about', component: AboutComponent },
  {path:'categories', component:CategoryComponent},
  {path:'categories/:category_id/news', component:NewsListComponent},
  {path: 'news/:id', component: NewsDetailComponent },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
