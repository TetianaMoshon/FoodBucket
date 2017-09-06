import { Component, OnInit } from '@angular/core';

import {UserService} from '../../client/api/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

    settings = {
        actions: {
            custom: [
                {
                    name: 'edit',
                    title: 'Edit ',
                },
                {
                    name: 'delete',
                    title: 'Delete ',
                },
            ],
            position: 'right',
            columnTitle: ' ',
            edit: false,
            delete: false,
        },
        custom: [
            {
                action: 'edit',
                buttonContent: `EDIT `
            },
            {
                action: 'delete',
                buttonContent: 'DELETE '
            }],
        pager: {
            display: true,
            perPage: 5,
        },
        add: {
            addButtonContent: 'Add'
        },
        columns: {
            user_id: {
                title: 'ID',
                width: '6%'
            },
            first_name: {
                title: 'Name'
            },
            last_name: {
                title: 'Surname'
            },
            email: {
                title: 'Email'
            },
            phone:  {
                title: 'Phone'
            },
            city: {
                title: 'City'
            },
            address: {
                title: 'Address'
            },
            favourites: {
                title: 'Favourites'
            },
            active: {
                title: 'Active'
            },
        }
    };

    public data;

    onCustom(event) {
        if (event.action === 'delete') {
            this.userService.deleteUserById(event.data.user_id)
                .subscribe(
                user => {
                },
                err => console.log(err)
            );
            this.data.remove(event.data);

            /*
            this.data.update()
            this.userService.getAllUsers(0, 2, true)
                .subscribe(
                    user => {
                        this.data =  user;
                    },
                    err => console.log(err)
                );*/
        }
    }

    constructor(private userService: UserService) {}


    ngOnInit() {
        this.userService.getAllUsers(0, 2, true)
            .subscribe(
                user => {
                    this.data =  user;
                },
                err => console.log(err)
            );
        this.userService.findUserById(1)
            .subscribe(
                user_find => {
                    console.log(user_find);
                },
                err => console.log(err)
            );
    }
}
