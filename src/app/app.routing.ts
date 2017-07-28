import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders} from '@angular/core';
import {HomeComponent} from './components/home/home.page.component';
import {IngredientsComponent} from './components/ingredients/ingredients.component';
import {CategoryComponent} from './components/category/category.component';
import {ProductlistComponent} from "./components/productlist/productlist.component";


const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'ingredients', component: IngredientsComponent},
  { path: 'category', component: CategoryComponent},
  { path: 'productlist', component: ProductlistComponent},
];

export  const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
