import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders} from '@angular/core';
import {HomeComponent} from './components/home/home.page.component';
import {IngredientsComponent} from './components/ingredients/ingredients.component';
import {CategoryComponent} from './components/category/category.component';
import {AboutusComponent} from './components/aboutus/aboutus.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'ingredients', component: IngredientsComponent},
  { path: 'category', component: CategoryComponent},
  { path: 'aboutus', component: AboutusComponent}
];

export  const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
