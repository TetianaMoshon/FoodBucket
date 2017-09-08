import {Component, OnInit, OnDestroy} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Router, ActivatedRoute} from '@angular/router';

import {UserService} from '../../../client/api/user.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {FlashMessagesService} from 'ngx-flash-messages';

@Component({
  selector: 'app-admin-user-page',
  templateUrl: './admin-user-page.component.html',
  styleUrls: ['./admin-user-page.component.css']
})
export class AdminUserPageComponent implements OnInit, OnDestroy{

    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: number;
    city: string;
    address: string;
    image: string;
    favourites = [];
    active =  true;

    action: {
        id: number,
        name: string
    };

    urlSubscription: Subscription;

    constructor(
      protected userService: UserService,
      protected route: ActivatedRoute,
      private flashMessagesService: FlashMessagesService,
    ) {
  }

    ngOnInit() {
        this.urlSubscription = this.route.url
            .subscribe(
                (segments) => {
                    const seg1 = segments[0].path,
                          seg2 = segments[1] !== undefined ? segments[1].path : '';

                    if (!isNaN(parseInt(seg1, 10)) && seg2 === 'edit') {

                        this.newUser(parseInt(seg1, 10));

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

    onSubmit(form: NgForm) {
        const userObject = {
            first_name: form.value.first_name,
            last_name: form.value.last_name,
            email: form.value.email,
            password: form.value.password,
            phone: Number(form.value.phone),
            city: form.value.city,
            address: form.value.address,
            image: '',
            favourites: [],
            active: true
        };
        console.log(userObject);
        if (this.action.name === 'create') {
            this.createUser(userObject);
            this.reset();
        } else {
            this.updateUser(this.action.id, userObject);
        }
    }

    createUser(userObject) {
        this.userService.createUser(userObject)
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

    updateUser(id: number, userObject) {
        this.userService.updateUserById(id, userObject)
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

    newUser(id: number) {
        this.userService.findUserById(id)
            .subscribe(
                user => {
                    this.first_name = user.first_name;
                    this.last_name = user.last_name;
                    this.email = user.email;
                    this.password = user.password;
                    this.phone = user.phone;
                    this.city = user.city;
                    this.address = user.address;
                },
                err => console.log(err)
            );
    }

    reset() {
        this.first_name = '';
        this.last_name = '';
        this.email = '';
        this.password = '';
        this.phone = null;
        this.city = '';
        this.address = '';
    }

}
