import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders} from '@angular/core';
import {AdminMainComponent} from "../adminmain/adminmain.component";
import {AdminAnalyticsComponent} from "../admin-analytics/admin-analytics.component";
import {AdmincategoriesComponent} from "../admincategories/admincategories.component";
import {AdminCommentsComponent} from "../admin-comments/admin-comments.component";
import {AdminIngredientsComponent} from "../admin-ingredients/admin-ingredients.component";
import {AdminOrdersComponent} from "../admin-orders/admin-orders.component";
import {AdminProductListComponent} from "../admin-product-list/admin-product-list.component";
import {AdminUsersComponent} from "../admin-users/admin-users.component";


const backendRoutes: Routes = [
    {path:'admin', component: AdminMainComponent},
    {path:'admin/orders', component: AdminOrdersComponent},
    {path:'admin/productlist', component: AdminProductListComponent},
    {path:'admin/comments', component: AdminCommentsComponent},
    {path:'admin/users', component: AdminUsersComponent},
    {path:'admin/categories', component: AdmincategoriesComponent},
    {path:'admin/analytics', component: AdminAnalyticsComponent},
    {path:'admin/ingredients', component: AdminIngredientsComponent},

];

export  const backendRouting: ModuleWithProviders = RouterModule.forChild(backendRoutes);

