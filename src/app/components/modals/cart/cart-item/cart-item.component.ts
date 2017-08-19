import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {


    @Input() info;
    @Output() ItemWasDeleted = new EventEmitter<any>();
    @Output() moneyToPayForADish = new EventEmitter<{totalPriceOfOneDish: number, id: number}>();

    totalPriceOfOneDish: number;
    amountOfDishesOrdered: number;


  constructor() { }

    ngOnInit() {
        this.amountOfDishesOrdered = 1;
        this.totalPriceOfOneDish = this.info.price;
        this.calculatingTotalPriceOfOneDish();
    }

    plusClicked(id: number) {

        ++this.amountOfDishesOrdered;
        this.calculatingTotalPriceOfOneDish();
    }

    minusClicked(id: number) {
        if (this.amountOfDishesOrdered <= 0) {
            this.amountOfDishesOrdered = 0;
        }else {
            --this.amountOfDishesOrdered;
        }
        this.calculatingTotalPriceOfOneDish();
    }

    deleteShoppingItem(id: number) {
        this.ItemWasDeleted.emit(id);
    }


    calculatingTotalPriceOfOneDish() {
        this.totalPriceOfOneDish = this.info.price * this.amountOfDishesOrdered;
        this.moneyToPayForADish.emit({totalPriceOfOneDish: this.totalPriceOfOneDish, id: this.info.id});
    }

}
