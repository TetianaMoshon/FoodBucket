import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';


@Component({
    template: `
    <img [src]="renderValue" />
  `,
})
export class ImageRenderComponent implements OnInit {

    public renderValue;

    @Input() value;

    constructor() {  }

    ngOnInit() {
        this.renderValue = this.value;
    }

}
