import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AgmCoreModule } from '@agm/core';

import { HomeComponent } from '../home/home.page.component';
import { IngredientsComponent } from '../ingredients/ingredients.component';
import { ProductlistComponent } from '../productlist/productlist.component';
import { CategoryComponent } from '../category/category.component';
import {frontendRouting} from "./frontend.routing";
import { ModalCongratulationComponent } from '../modals/modal-congratulation/modal-congratulation.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { MenuComponent } from '../home/menu/menu.component';
import { LoginComponent } from '../modals/login/login.component';
import { NewAccountComponent } from '../modals/new-account/new-account.component';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { SliderComponent } from '../slider/slider.component';
import { TopComponent } from '../home/top/top.component';


@NgModule({
    declarations: [
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
        frontendRouting,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDgXQMgwN1IOu9c6ZyHjqiVzaB9JXhIoTA'
        })
    ],
    providers: [],
    bootstrap: []
})
export class MainFrontendModule { }
