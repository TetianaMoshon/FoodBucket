import {Component, OnInit, OnDestroy} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Router, ActivatedRoute} from '@angular/router';

import {UserService} from '../../../client/api/user.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {FlashMessagesService} from 'ngx-flash-messages';
import { UserModel } from './userModel';

@Component({
  selector: 'app-admin-user-page',
  templateUrl: './admin-user-page.component.html',
  styleUrls: ['./admin-user-page.component.css']
})
export class AdminUserPageComponent implements OnInit, OnDestroy {

    action: {
        id: number,
        name: string
    };

    urlSubscription: Subscription;

    constructor(
        protected userService: UserService,
      protected route: ActivatedRoute,
      private flashMessagesService: FlashMessagesService,
    ) {}

    userModel = new UserModel('', '' , '', '', null, '', '', '', [], true);

    ngOnInit() {
        console.log(this.route.params);
        this.urlSubscription = this.route.url
            .subscribe(
                (segments) => {
                    const seg1 = segments[0].path,
                          seg2 = segments[1] !== undefined ? segments[1].path : '';

                    if (!isNaN(parseInt(seg1, 10)) && seg2 === 'edit') {

                        this.fillUserById(parseInt(seg1, 10));

                        this.action = {
                            id: parseInt(seg1, 10),
                            name: seg2
                        };
                    } else {
                        this.action = {
                            id: 0,
                            name: seg1
                        };
                    }
                }
            );
    }

    ngOnDestroy() {
        this.urlSubscription.unsubscribe();
    }

    onSubmit() {
        this.userModel.phone = Number(this.userModel.phone);
        this.updateUser(this.action.id, this.userModel);
    }

    updateUser(id: number, userModel) {
        this.userService.updateUserById(id, userModel)
            .subscribe(
                user => {
                    this.flashMessagesService.show(`User with id:${user['userId']} was successfully updated!`, {
                        classes: ['alert', 'alert-success'],
                        timeout: 3000,
                    });
                },
                err => console.log(err)
            );
    }

    fillUserById(id: number) {
        this.userService.findUserById(id)
            .subscribe(
                user => {
                    this.userModel.firstName = user.firstName;
                    this.userModel.lastName = user.lastName;
                    this.userModel.email = user.email;
                    this.userModel.password = user.password;
                    this.userModel.phone = Number(this.userModel.phone);
                    this.userModel.city = user.city;
                    this.userModel.address = user.address;
                },
                err => console.log(err)
            );
    }
}
