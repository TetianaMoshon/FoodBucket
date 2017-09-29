
import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders} from '@angular/core';
import {HomeComponent} from './components/home/home.page.component';
import {IngredientsComponent} from './components/ingredients/ingredients.component';
import {CategoryComponent} from './components/category/category.component';
import {AboutusComponent} from './components/aboutus/aboutus.component';
import {ProductlistComponent} from './components/productlist/productlist.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {AdminMainComponent} from './components/adminmain/adminmain.component';
import {AdminAnalyticsComponent} from './components/admin-analytics/admin-analytics.component';
import {AdmincategoriesComponent} from './components/admincategories/admincategories.component';
import {AdminIngredientsComponent} from './components/admin-ingredients/admin-ingredients.component';
import {AdminOrdersComponent} from './components/admin-orders/admin-orders.component';
import {AdminProductListComponent} from './components/admin-product-list/admin-product-list.component';
import {AdminUsersComponent} from './components/admin-users/admin-users.component';
import {ProductpageComponent} from './components/productlist/productpage/productpage.component';
import { AdminProductPageComponent } from './components/admin-product-list/admin-product-page/admin-product-page.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import { AdminUserPageComponent } from './components/admin-users/admin-user-page/admin-user-page.component';
import {AdmincategoriesFormComponent} from './components/admincategories/admincategories-form/admincategories-form.component';

import {Error404Component} from './components/error404/error404.component';
import {AdminIngredientsFormComponent} from './components/admin-ingredients/adminingredients-form/adminingredients-form.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
    { path: 'ingredients', component: IngredientsComponent },
    { path: 'category', children: [
        { path: '', component: CategoryComponent },
        { path: ':id', component: ProductlistComponent }
    ]},
    { path: 'product', children: [
        { path: ':id', component: ProductpageComponent }
    ]},
    { path: 'aboutus', component: AboutusComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'profile', component: UserProfileComponent },
  { path: 'admin', children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: AdminMainComponent},
      { path: 'orders', component: AdminOrdersComponent},
      { path: 'productlist', children: [
          { path: '', component: AdminProductListComponent },
          { path: ':id/edit', component: AdminProductPageComponent },
          { path: 'create', component: AdminProductPageComponent },
      ]},
      { path: 'users', children: [
          { path: '', component: AdminUsersComponent },
          { path: ':id/edit', component: AdminUserPageComponent },
          { path: 'create', component: AdminUserPageComponent },
      ]},
      { path: 'categories', children: [
          { path: '', component: AdmincategoriesComponent },
          { path: ':id/edit', component: AdmincategoriesFormComponent },
          { path: 'create', component: AdmincategoriesFormComponent },
      ]},
      { path: 'analytics', component: AdminAnalyticsComponent },
      { path: 'ingredients', children: [
          { path: '', component: AdminIngredientsComponent },
          { path: ':id/edit', component: AdminIngredientsFormComponent },
          { path: 'create', component: AdminIngredientsFormComponent },
       ]},
  ]},
      { path: '**', component: Error404Component }
];

export  const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);


