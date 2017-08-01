import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
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
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SliderComponent } from './components/slider/slider.component';
import { TopComponent } from './components/home/top/top.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IngredientsComponent,
    CategoryComponent,
    ProductlistComponent,
    ModalCongratulationComponent,
    NavbarComponent,
    FooterComponent,
    TopComponent,
    MenuComponent,
      LoginComponent,
      NewAccountComponent,
      CheckoutComponent,
      SliderComponent,
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
