import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.page.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { CategoryComponent } from './components/category/category.component';
import {appRouting} from './app.routing';
import { ModalCongratulationComponent } from './components/modals/modal-congratulation/modal-congratulation.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/home/menu/menu.component';
import { LoginComponent } from './components/modals/login/login.component';
import { NewAccountComponent } from './components/modals/new-account/new-account.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SliderComponent } from './components/slider/slider.component';
import { AdminMainComponent } from './components/adminmain/adminmain.component';
import { AdminnavbarComponent } from './components/adminnavbar/adminnavbar.component';
import { AdmincategoriesComponent } from './components/admincategories/admincategories.component';
import { AdminProductListComponent } from './components/admin-product-list/admin-product-list.component';
import { AdminIngredientsComponent } from './components/admin-ingredients/admin-ingredients.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminCommentsComponent } from './components/admin-comments/admin-comments.component';
import { AdminAnalyticsComponent } from './components/admin-analytics/admin-analytics.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IngredientsComponent,
    CategoryComponent,
    ModalCongratulationComponent,
    NavbarComponent,
    FooterComponent,
    MenuComponent,
      LoginComponent,
      NavbarComponent,
      FooterComponent,
      NewAccountComponent,
      CheckoutComponent,
      SliderComponent,
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
      ModalCongratulationComponent,
      LoginComponent,
      NewAccountComponent
  ],
  imports: [
      ModalModule.forRoot(),
      BrowserModule,
      CollapseModule,
      appRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
