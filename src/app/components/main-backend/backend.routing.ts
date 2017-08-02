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
    {path:'admin',
        component: AdminMainComponent,
        children: [
            {path:'orders', component: AdminOrdersComponent},
            {path:'productlist', component: AdminProductListComponent},
            {path:'comments', component: AdminCommentsComponent},
            {path:'users', component: AdminUsersComponent},
            {path:'categories', component: AdmincategoriesComponent},
            {path:'analytics', component: AdminAnalyticsComponent},
            {path:'ingredients', component: AdminIngredientsComponent},
        ]
    },


];

export  const backendRouting: ModuleWithProviders = RouterModule.forChild(backendRoutes);

