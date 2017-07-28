import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.page.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { CategoryComponent } from './components/category/category.component';
import {appRouting} from './app.routing';
import { ModalCongratulationComponent } from './components/modals/modal-congratulation/modal-congratulation.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/modals/login/login.component';
import { NewAccountComponent } from './components/modals/new-account/new-account.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IngredientsComponent,
    CategoryComponent,
    ModalCongratulationComponent,
      LoginComponent,
      NavbarComponent,
      FooterComponent,
      NewAccountComponent,
      AboutusComponent
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
      appRouting,
      AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDgXQMgwN1IOu9c6ZyHjqiVzaB9JXhIoTA'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
