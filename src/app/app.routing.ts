import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders} from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {IngredientsComponent} from './components/ingredients/ingredients.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'ingredients', component: IngredientsComponent}
];

export  const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
