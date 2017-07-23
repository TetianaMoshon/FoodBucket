import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// ngx-bootstrap
import { CarouselModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.page.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { CategoryComponent } from './components/category/category.component';
import {appRouting} from './app.routing';
import { SliderComponent } from './components/slider/slider.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IngredientsComponent,
    CategoryComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
      // ngx-bootstrap
      CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
