import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartCommunicationService} from '../../../../services/cart-communication.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

    @Input() info;
    @Output() ItemWasDeleted = new EventEmitter<any>();

    totalPriceOfOneDish: number;
    amountOfDishesOrdered: number;


  constructor(private cartCommunicationService: CartCommunicationService) { }

    ngOnInit() {
        this.amountOfDishesOrdered = 1;
        this.totalPriceOfOneDish = this.info.price;
    }

    plusClicked(id: number) {
        ++this.amountOfDishesOrdered;
        this.totalPriceOfOneDish = this.amountOfDishesOrdered * this.info.price;
        this.cartCommunicationService.passedData.next({amount: this.amountOfDishesOrdered, id: this.info.id });
    }

    minusClicked(id: number) {
        if (this.amountOfDishesOrdered <= 1) {
            this.amountOfDishesOrdered = 1;
        }else {
            --this.amountOfDishesOrdered;
            this.totalPriceOfOneDish = this.amountOfDishesOrdered * this.info.price;
        }
        this.cartCommunicationService.passedData.next({amount: this.amountOfDishesOrdered, id: this.info.id });
    }

    deleteShoppingItem(id: number) {
        this.ItemWasDeleted.emit(id);
    }

}
