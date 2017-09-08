import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { Configuration } from './configuration';

import { AuthService } from './api/auth.service';
import { CartService } from './api/cart.service';
import { CategoryService } from './api/category.service';
import { ContactsService } from './api/contacts.service';
import { IngredientService } from './api/ingredient.service';
import { OrderService } from './api/order.service';
import { ProductService } from './api/product.service';
import { PromotionService } from './api/promotion.service';
import { TopratedService } from './api/toprated.service';

@NgModule({
  imports:      [ CommonModule, HttpModule ],
  declarations: [],
  exports:      [],
  providers:    [ AuthService, CartService, CategoryService, ContactsService, IngredientService, OrderService, ProductService, PromotionService, TopratedService ]
})
export class ApiModule {
    public static forConfig(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ {provide: Configuration, useFactory: configurationFactory}]
        }
    }
}
