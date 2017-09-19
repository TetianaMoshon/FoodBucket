import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AgmCoreModule } from '@agm/core';
import { DisqusModule } from 'ngx-disqus';
import { ChartsModule } from 'ng2-charts';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.page.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { CategoryComponent } from './components/category/category.component';
import { ModalCongratulationComponent } from './components/modals/modal-congratulation/modal-congratulation.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/home/menu/menu.component';
import { LoginComponent } from './components/modals/login/login.component';
import { NewAccountComponent } from './components/modals/new-account/new-account.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SliderComponent } from './components/slider/slider.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { TopComponent } from './components/home/top/top.component';
import { AdminMainComponent } from './components/adminmain/adminmain.component';
import { AdminnavbarComponent } from './components/adminnavbar/adminnavbar.component';
import { AdmincategoriesComponent } from './components/admincategories/admincategories.component';
import { AdminProductListComponent } from './components/admin-product-list/admin-product-list.component';
import { AdminProductListImageComponent } from './components/admin-product-list/admin-product-list-image.component';
import { AdminIngredientsComponent } from './components/admin-ingredients/admin-ingredients.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminCommentsComponent } from './components/admin-comments/admin-comments.component';
import { AdminAnalyticsComponent } from './components/admin-analytics/admin-analytics.component';
import { CongratulationComponent } from './components/modals/congratulation/congratulation.component';
import { ForgotPassComponent } from './components/modals/forgot-pass/forgot-pass.component';
import { ConfirmationComponent } from './components/modals/confirmation/confirmation.component';
import { ProductpageComponent } from './components/productlist/productpage/productpage.component';
import { AdminProductPageComponent } from './components/admin-product-list/admin-product-page/admin-product-page.component';
import { AdmincategoriesFormComponent } from './components/admincategories/admincategories-form/admincategories-form.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TabsModule } from 'ngx-bootstrap';
import {PagerService} from './services/pagination.service';
import { CartBoxComponent } from './components/modals/cart/cart-box/cart-box.component';
import { CartItemComponent } from './components/modals/cart/cart-item/cart-item.component';
import { Error404Component } from './components/error404/error404.component';
import { DisqusComponent } from './components/disqus/disqus.component';
import { CommentsService } from './services/comments.service';
import { OrdersFiltersPipe } from './pipes/orders-filters.pipe';
import { ApiModule } from './client/index';
import { apiConfig } from './client/api.config';
import { AdminUserPageComponent } from './components/admin-users/admin-user-page/admin-user-page.component';
 import {DataService} from './services/data/data.service';
import {CartCommunicationService} from './services/cart-communication.service';

import { FlashMessagesModule } from 'ngx-flash-messages';
import {appRouting} from './app.routing';
import {AdminIngredientsFormComponent} from './components/admin-ingredients/adminingredients-form/adminingredients-form.component';
import { IngredientEditComponent } from './components/admin-product-list/admin-product-page/ingredient-edit/ingredient-edit.component';


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
      AdminProductListImageComponent,
      AdminIngredientsComponent,
      AdminOrdersComponent,
      AdminUsersComponent,
      AdminCommentsComponent,
      AdminAnalyticsComponent,
      CongratulationComponent,
      ForgotPassComponent,
      ConfirmationComponent,
      ProductpageComponent,
      CartBoxComponent,
      CartItemComponent,
      AdminProductPageComponent,
      DisqusComponent,
      UserProfileComponent,
      Error404Component,
      OrdersFiltersPipe,
      AdminUserPageComponent,
      AdmincategoriesFormComponent,
      AdminIngredientsFormComponent,
      IngredientEditComponent
  ],
  entryComponents: [
      ModalCongratulationComponent,
      LoginComponent,
      CongratulationComponent,
      ForgotPassComponent,
      ConfirmationComponent,
      NewAccountComponent,
      AdminProductListImageComponent,
      CartBoxComponent,
  ],
  imports: [
      ModalModule.forRoot(),
      BrowserModule,
      FlashMessagesModule,
      CollapseModule,
      FormsModule,
      appRouting,
      DisqusModule,
      DisqusModule.forRoot('foodbucket-com-1'),
      ApiModule.forConfig(apiConfig),
      AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDgXQMgwN1IOu9c6ZyHjqiVzaB9JXhIoTA'
    }),
      Ng2SmartTableModule,
      ChartsModule,
      [TabsModule.forRoot()],
  ],
  providers: [PagerService, CommentsService, CartCommunicationService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
