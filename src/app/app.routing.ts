
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
import {AdminCommentsComponent} from './components/admin-comments/admin-comments.component';
import {AdminIngredientsComponent} from './components/admin-ingredients/admin-ingredients.component';
import {AdminOrdersComponent} from './components/admin-orders/admin-orders.component';
import {AdminProductListComponent} from './components/admin-product-list/admin-product-list.component';
import {AdminUsersComponent} from './components/admin-users/admin-users.component';
import {ProductpageComponent} from './components/productlist/productpage/productpage.component';
import { AdminProductPageComponent } from './components/admin-product-list/admin-product-page/admin-product-page.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'ingredients', component: IngredientsComponent},
  { path: 'category', component: CategoryComponent},
  { path: 'aboutus', component: AboutusComponent},
  { path: 'category', component: CategoryComponent},
  { path: 'category/productlist', component: ProductlistComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'admin', component: AdminMainComponent},
  { path: 'admin/orders', component: AdminOrdersComponent},
  { path: 'admin/productlist', component: AdminProductListComponent},
  { path: 'admin/productlist/productpage', component: AdminProductPageComponent},
  { path: 'admin/comments', component: AdminCommentsComponent},
  { path: 'admin/users', component: AdminUsersComponent},
  { path: 'admin/categories', component: AdmincategoriesComponent},
  { path: 'admin/analytics', component: AdminAnalyticsComponent},
  { path: 'admin/ingredients', component: AdminIngredientsComponent},
  { path: 'admin/productlist/productpage', component: ProductpageComponent},
  { path: 'category/productlist/productpage', component: ProductpageComponent},
  { path: 'profile', component: UserProfileComponent}
];

export  const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);

