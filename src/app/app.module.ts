import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.page.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { CategoryComponent } from './components/category/category.component';
import {appRouting} from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IngredientsComponent,
    CategoryComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    appRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
