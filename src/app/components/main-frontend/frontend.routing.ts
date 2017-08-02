import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders} from '@angular/core';
import {HomeComponent} from '../home/home.page.component';
import {IngredientsComponent} from '../ingredients/ingredients.component';
import {CategoryComponent} from '../category/category.component';
import {AboutusComponent} from '../aboutus/aboutus.component';
import {ProductlistComponent} from "../productlist/productlist.component";
import {CheckoutComponent} from "../checkout/checkout.component";

const frontendRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'ingredients', component: IngredientsComponent},
    { path: 'category', component: CategoryComponent},
    { path: 'aboutus', component: AboutusComponent},
    { path: 'category', component: CategoryComponent},
    { path: 'category/productlist', component: ProductlistComponent},
    {path:'checkout', component: CheckoutComponent},

];

export  const frontendRouting: ModuleWithProviders = RouterModule.forChild(frontendRoutes);

