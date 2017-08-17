import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.page.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { CategoryComponent } from './components/category/category.component';
import {appRouting} from './app.routing';
import { ModalCongratulationComponent } from './components/modals/modal-congratulation/modal-congratulation.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/home/menu/menu.component';
import { LoginComponent } from './components/modals/login/login.component';
import { NewAccountComponent } from './components/modals/new-account/new-account.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SliderComponent } from './components/slider/slider.component';
import { TopComponent } from './components/home/top/top.component';
import { AdminMainComponent } from './components/adminmain/adminmain.component';
import { AdminnavbarComponent } from './components/adminnavbar/adminnavbar.component';
import { AdmincategoriesComponent } from './components/admincategories/admincategories.component';
import { AdminProductListComponent } from './components/admin-product-list/admin-product-list.component';
import { AdminIngredientsComponent } from './components/admin-ingredients/admin-ingredients.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminCommentsComponent } from './components/admin-comments/admin-comments.component';
import { AdminAnalyticsComponent } from './components/admin-analytics/admin-analytics.component';
import { CongratulationComponent } from './components/modals/congratulation/congratulation.component';
import { ForgotPassComponent } from './components/modals/forgot-pass/forgot-pass.component';
import { ConfirmationComponent } from './components/modals/confirmation/confirmation.component';
import { ProductpageComponent } from './components/productlist/productpage/productpage.component';

@NgModule({
  declarations: [
      AppComponent,
      HomeComponent,
      IngredientsComponent,
      CategoryComponent,
      ProductlistComponent,
      ModalCongratulationComponent,
      LoginComponent,
      NavbarComponent,
      FooterComponent,
      NewAccountComponent,
      AboutusComponent,
      NavbarComponent,
      FooterComponent,
      MenuComponent,
      LoginComponent,
      NewAccountComponent,
      CheckoutComponent,
      SliderComponent,
      TopComponent,
      AdminMainComponent,
      AdminnavbarComponent,
      AdmincategoriesComponent,
      AdminProductListComponent,
      AdminIngredientsComponent,
      AdminOrdersComponent,
      AdminUsersComponent,
      AdminCommentsComponent,
      AdminAnalyticsComponent,
      CongratulationComponent,
      ForgotPassComponent,
      ConfirmationComponent,
      ProductpageComponent,
  ],
  entryComponents: [
      ModalCongratulationComponent,
      LoginComponent,
      NewAccountComponent,
      CongratulationComponent,
      ForgotPassComponent,
      ConfirmationComponent,
  ],
  imports: [
      ModalModule.forRoot(),
      BrowserModule,
      CollapseModule,
      appRouting,
      AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDgXQMgwN1IOu9c6ZyHjqiVzaB9JXhIoTA'
    }),
      ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
