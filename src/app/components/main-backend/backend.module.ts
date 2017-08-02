import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AgmCoreModule } from '@agm/core';

import {AdminMainComponent} from "../adminmain/adminmain.component";
import {AdminAnalyticsComponent} from "../admin-analytics/admin-analytics.component";
import {AdmincategoriesComponent} from "../admincategories/admincategories.component";
import {AdminCommentsComponent} from "../admin-comments/admin-comments.component";
import {AdminIngredientsComponent} from "../admin-ingredients/admin-ingredients.component";
import {AdminOrdersComponent} from "../admin-orders/admin-orders.component";
import {AdminProductListComponent} from "../admin-product-list/admin-product-list.component";
import {AdminUsersComponent} from "../admin-users/admin-users.component";
import {backendRouting} from "./backend.routing";
import { AdminnavbarComponent } from '../adminnavbar/adminnavbar.component';
import {MainBackendComponent} from "./main-backend.component";
@NgModule({
    declarations: [
        MainBackendComponent,
        AdminMainComponent,
        AdminnavbarComponent,
        AdmincategoriesComponent,
        AdminProductListComponent,
        AdminIngredientsComponent,
        AdminOrdersComponent,
        AdminUsersComponent,
        AdminCommentsComponent,
        AdminAnalyticsComponent,

    ],
    entryComponents: [
    ],
    imports: [
        ModalModule.forRoot(),
        BrowserModule,
        CollapseModule,
        backendRouting,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDgXQMgwN1IOu9c6ZyHjqiVzaB9JXhIoTA'
        })
    ],
    providers: [],
    bootstrap: [MainBackendComponent]
})
export class MainBackendModule { }
