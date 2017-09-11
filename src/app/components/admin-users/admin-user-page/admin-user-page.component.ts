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
export class AdminUserPageComponent implements OnInit, OnDestroy{

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
        this.urlSubscription = this.route.url
            .subscribe(
                (segments) => {
                    const seg1 = segments[0].path,
                          seg2 = segments[1] !== undefined ? segments[1].path : '';

                    if (!isNaN(parseInt(seg1, 10)) && seg2 === 'edit') {

                        this.findUserById(parseInt(seg1, 10));

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
        if (this.action.name === 'create') {
            this.userModel.phone = Number(this.userModel.phone);
            this.createUser(this.userModel);
            this.reset();
        } else {
            this.userModel.phone = Number(this.userModel.phone);
            this.updateUser(this.action.id, this.userModel);
        }
    }

    createUser(userModel) {
        this.userService.createUser(userModel)
            .subscribe(
                user => {
                    this.flashMessagesService.show(`User with id:${user['user_id']} was successfully created!`, {
                        classes: ['alert', 'alert-success'],
                        timeout: 3000,
                    });
                    this.reset();
                },
                err => console.log(err)
            );
    }

    updateUser(id: number, userModel) {
        this.userService.updateUserById(id, userModel)
            .subscribe(
                user => {
                    this.flashMessagesService.show(`User with id:${user['user_id']} was successfully updated!`, {
                        classes: ['alert', 'alert-success'],
                        timeout: 3000,
                    });
                },
                err => console.log(err)
            );
    }

    findUserById(id: number) {
        this.userService.findUserById(id)
            .subscribe(
                user => {
                    this.userModel.first_name = user.first_name;
                    this.userModel.last_name = user.last_name;
                    this.userModel.email = user.email;
                    this.userModel.password = user.password;
                    this.userModel.phone = Number(this.userModel.phone);
                    this.userModel.city = user.city;
                    this.userModel.address = user.address;
                },
                err => console.log(err)
            );
    }

    reset() {
        this.userModel = new UserModel('', '' , '', '', null, '', '', '', [], true);
    }
}
